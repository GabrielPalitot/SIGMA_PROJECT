import mqtt from "mqtt";
import Redis from "ioredis";
import axios from "axios";

const mqttClient = mqtt.connect(
  process.env.MQTT_BROKER_URL || "mqtt://localhost",
);
const redis = new Redis();

const REDIS_KEY = "sensor_data_queue";
const BATCH_SIZE = 60;
const API_URL = process.env.API_URL || "http://localhost:3000/api/measurements";

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
  mqttClient.subscribe("sigma-project-ggl/measurements");
});

mqttClient.on("message", async (topic, message) => {
  if (topic === "sigma-project-ggl/measurements") {
    const data = JSON.parse(message.toString());

    // Adiciona os dados na lista Redis
    await redis.lpush(REDIS_KEY, JSON.stringify(data));
    console.log("Data added to Redis:", data);

    // Verifica se o tamanho da lista atingiu o limite
    const queueLength = await redis.llen(REDIS_KEY);
    if (queueLength >= BATCH_SIZE) {
      await processBatch();
    }
  }
});

// Processa o lote de dados chamando a API HTTP
async function processBatch() {
  // Pega os dados do Redis
  const batch = await redis.lrange(REDIS_KEY, 0, BATCH_SIZE - 1);

  if (batch.length > 0) {
    const parsedBatch = batch.map((item) => JSON.parse(item));

    try {
      // Chama a API para salvar os dados
      await axios.post(API_URL, { measurements: parsedBatch });

      // Remove os itens processados do Redis
      await redis.ltrim(REDIS_KEY, batch.length, -1);
      console.log(`Processed batch of ${batch.length} items.`);
    } catch (error) {
      console.log(error);
    }
  }
}

// Cron job para processar dados restantes
setInterval(async () => {
  const queueLength = await redis.llen(REDIS_KEY);
  if (queueLength > 0) {
    console.log(`Processing batch of ${queueLength} remaining items.`);
    await processBatch();
  }
}, 10000); // Verifica a cada 10 segundos
