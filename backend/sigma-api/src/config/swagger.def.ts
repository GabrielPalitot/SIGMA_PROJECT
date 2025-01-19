import IotDeviceSwagger from "../controllers/iotDevice/swagger";
import MeasurementSwagger from "../controllers/measurements/swagger";

const iotDeviceSwagger = new IotDeviceSwagger();
const measurementSwagger = new MeasurementSwagger();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "SIGMA PROJECT API",
      description: "SIGMA PROJECT FOR IOT",
      version: "1.0.0",
    },
    paths: {
      ...iotDeviceSwagger.swaggerController,
      ...measurementSwagger.swaggerController,
    },
    components: {
      schemas: {
        ...iotDeviceSwagger.schemas,
        ...measurementSwagger.schemas,
      },
    },
  },
  apis: ["./src/api/routes/v1/*.js"],
};

export default swaggerOptions;
