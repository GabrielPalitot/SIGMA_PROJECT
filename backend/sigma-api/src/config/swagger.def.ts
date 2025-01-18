const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "SIGMA PROJECT API",
      description: "SIGMA PROJECT FOR IOT",
      version: "1.0.0",
    },
  },
  apis: ["./src/api/routes/v1/*.js"],
};

export default swaggerOptions;
