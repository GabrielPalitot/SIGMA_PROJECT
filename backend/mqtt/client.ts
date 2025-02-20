import mqtt from "mqtt";
import Redis from "ioredis";
import axios from "axios";
import cron from "node-cron"; // Importando o node-cron

export interface ResponseMeasurementDTO {
  id_esp: string;               // UUID
  measurement_time: string;     // data/hora com offset, ex.: "2023-02-04T12:00:00.000Z"
  solo_humidity: number;
  temperature: number;
  air_humidity: number;
  pressure: number;
  has_rain: boolean;
  created_at: string;           // data/hora com offset
  updated_at: string;           // data/hora com offset
}

const mqttClient = mqtt.connect(
  process.env.MQTT_BROKER_URL || "mqtt://mosquitto",
);
const redis = new Redis(
  {
    host: "redis",
    port: 6379
  }
);

const REDIS_KEY = "sensor_data_queue";
const BATCH_SIZE = 30;
const API_URL_POST =
  process.env.API_URL || "http://app:8500/measurements";
const API_URL_GET = "http://app:8500/iot-device/id-esp";

const KC = 1.15;
const LATITUDE = -3.71839;
const THREE_DAYS_COUNT = 1000;


mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
  mqttClient.subscribe(["sigma-project-ggl/measurements", "sigma-project-ggl/check"]);
});

mqttClient.on("message", async (topic, message) => {
  try {
    if (topic === "sigma-project-ggl/measurements") {
      const data = JSON.parse(message.toString());
      await redis.lpush(REDIS_KEY, JSON.stringify(data));
      console.log("Data added to Redis:", data);

      const queueLength = await redis.llen(REDIS_KEY);
      if (queueLength >= BATCH_SIZE) {
        await processBatch();
      }
    } else if (topic === "sigma-project-ggl/check") {
      console.log("Received check message");
      await findIdEsp();
    }

  } catch (error) {
    console.log(error);
  }
});

async function findIdEsp() {
  try {
    const response = await axios.get(API_URL_GET);
    console.log("Data received:", response.data);
  } catch (error) {
    console.error(error);
  }
}

async function processBatch() {
  const batch = await redis.lrange(REDIS_KEY, 0, BATCH_SIZE - 1);

  if (batch.length > 0) {
    const parsedBatch = batch.map((item) => JSON.parse(item));

    try {
      const response = await axios.post(API_URL_POST, parsedBatch);
      console.log(response.data);
      await redis.ltrim(REDIS_KEY, batch.length, -1);
      console.log(`Processed batch of ${batch.length} items.`);
    } catch (error) {
      console.log(error);
    }
  }
}

setInterval(async () => {
  const queueLength = await redis.llen(REDIS_KEY);
  console.log("The queue length is:", queueLength);
  if (queueLength > 0) {
    console.log(`Processing batch of ${queueLength} remaining items.`);
    await processBatch();
  }
}, 5000);


// ====================================== Alterar aqui ======================================
//Deve ser feita a publicação recorrente para o gateway utilizando a rota getIwn, 
// no caso enviaremos apenas a flag "irriga" (boolean) dizendo para irrigar ou não
//pode ser feito usando o setInterval ou o node-cron
// ==========================================================================================


// ==> PUBLICAÇÃO DIÁRIA (usando node-cron)
// A sintaxe '0 0 * * *' significa "todos os dias à 00:00"
// cron.schedule("0 0 */4 * * *", async () => {

//   const hoje = new Date(); // data atual
//   const dayNumber = await getDayOfYear(hoje);
//   const { tmax, tmin, tmean } = await getETCParams();
//   const etc = await calculateEtc(tmax, tmin, tmean, LATITUDE, dayNumber, KC)
//   const mensagemDiaria = JSON.stringify(etc);

//   mqttClient.publish("sigma-project-ggl/evapotranspiracao", mensagemDiaria, { qos: 0 }, (err) => {
//     if (err) {
//       console.error("Erro ao publicar a mensagem diária:", err);
//     } else {
//       console.log("Mensagem diária publicada com sucesso em sigma-project-ggl/evapotranspiracao");
//     }
//   });
// });