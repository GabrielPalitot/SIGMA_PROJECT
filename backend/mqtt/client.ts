import mqtt from "mqtt";
import Redis from "ioredis";
import axios from "axios";

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
const API_URL_GET = "http://app:8500/iot-device/id-esp"

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
  mqttClient.subscribe(["sigma-project-ggl/measurements","sigma-project-ggl/check"]);
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
  try{
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
      const response = await axios.post(API_URL_POST, parsedBatch );
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
