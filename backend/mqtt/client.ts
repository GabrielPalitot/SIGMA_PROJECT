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

export async function getETCParams() {
  try {
    const response = await axios.get<ResponseMeasurementDTO[]>("http://34.29.227.225:8600/measurements/all");
    const data = response.data;

    // Quantidade de dados que correspondem a 3 dias

    // Pegando somente os últimos 25920 registros (se existirem)
    // Se data tiver menos que 25920, ele pega tudo para evitar erro.
    const lastThreeDaysData = data.slice(-THREE_DAYS_COUNT);

    // Extrair somente as temperaturas (supondo que cada medição tenha a prop 'temperature')
    const temperatures = lastThreeDaysData.map(item => item.temperature);

    // Calcular temperatura mínima e máxima
    const tmin = Math.min(...temperatures);
    const tmax = Math.max(...temperatures);

    // Calcular temperatura média
    const sum = temperatures.reduce((acc, val) => acc + val, 0);
    const tmean = sum / temperatures.length;

    // Retorna um objeto com os valores calculados
    return { tmax, tmin, tmean };
  } catch (error) {
    console.error("Erro ao obter dados:", error);
    throw error; // ou retorne valores default
  }
}

export function calculateEtc(
  tmax: number,
  tmin: number,
  tmean: number,
  latitude: number,
  dayOfYear: number,
  kc: number
): number {
  // Constante solar (MJ/m²/min)
  const G_s = 0.082;

  // Converter graus para radianos
  const phi = (Math.PI / 180) * latitude;

  // Calcular declinação solar (delta)
  const delta =
    0.409 *
    Math.sin(((2 * Math.PI) / 365) * dayOfYear - 1.39);
  console.log("delta =", delta);

  // Calcular distância relativa Terra-Sol (d_r)
  const d_r =
    1 + 0.033 * Math.cos(((2 * Math.PI) / 365) * dayOfYear);
  console.log("d_r =", d_r);

  // Calcular ângulo horário do nascer/pôr do sol (omega_s)
  const omega_s = Math.acos(-Math.tan(phi) * Math.tan(delta));
  console.log("omega_s =", omega_s);

  // Calcular radiação extraterrestre (R_a)
  const R_a =
    ((24 * 60) / Math.PI) *
    G_s *
    d_r *
    (omega_s * Math.sin(phi) * Math.sin(delta) +
      Math.cos(phi) * Math.cos(delta) * Math.sin(omega_s));
  console.log("R_a =", R_a);

  // Fórmula de Hargreaves e Samani (ET0)
  const et0 =
    0.0023 *
    (tmean + 17.8) *
    Math.sqrt(tmax - tmin) *
    R_a;
  console.log("et0 =", et0);

  // Ajuste pelo coeficiente de cultura (ETc)
  const etc = et0 * kc;
  console.log("etc =", etc);

  return etc;
}

async function getDayOfYear(date: Date): Promise<number> {
  // data do primeiro dia do ano (ex.: 1º/jan/2025)
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  // quantos ms existem em um dia
  const msInDay = 24 * 60 * 60 * 1000;

  // difereça em ms entre 'date' e 'startOfYear'
  const diff = date.getTime() - startOfYear.getTime();

  // converter para dias inteiros e somar 1
  const dayOfYear = Math.floor(diff / msInDay) + 1;

  return dayOfYear;
}

setInterval(async () => {
  const queueLength = await redis.llen(REDIS_KEY);
  console.log("The queue length is:", queueLength);
  if (queueLength > 0) {
    console.log(`Processing batch of ${queueLength} remaining items.`);
    await processBatch();
  }
}, 5000);


// ==> PUBLICAÇÃO DIÁRIA (usando node-cron)
// A sintaxe '0 0 * * *' significa "todos os dias à 00:00"
cron.schedule("0 0 */4 * * *", async () => {

  const hoje = new Date(); // data atual
  const dayNumber = await getDayOfYear(hoje);
  const { tmax, tmin, tmean } = await getETCParams();
  const etc = await calculateEtc(tmax, tmin, tmean, LATITUDE, dayNumber, KC)
  const mensagemDiaria = JSON.stringify(etc);

  mqttClient.publish("sigma-project-ggl/evapotranspiracao", mensagemDiaria, { qos: 0 }, (err) => {
    if (err) {
      console.error("Erro ao publicar a mensagem diária:", err);
    } else {
      console.log("Mensagem diária publicada com sucesso em sigma-project-ggl/evapotranspiracao");
    }
  });
});