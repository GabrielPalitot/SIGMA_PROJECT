import IotDeviceSwagger from "../controllers/iotDevice/swagger";

const iotDeviceSwagger = new IotDeviceSwagger();

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
    },
    components: {
      schemas: {
        ...iotDeviceSwagger.schemas,
      },
    },
  },
  apis: ["./src/api/routes/v1/*.js"],
};

export default swaggerOptions;
