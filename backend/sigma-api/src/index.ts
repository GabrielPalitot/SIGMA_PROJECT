import PostgresDataBaseConnection from "./db/coreConnection";
import express from "express";
import swaggerOptions from "./config/swagger.def";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import "reflect-metadata";
import Repositories from "./repositories/repositories";
import Controllers from "./controllers/controllers";

export const postgresHandler = new PostgresDataBaseConnection();
postgresHandler.connect();
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const repositories = new Repositories();
const controllers = new Controllers(repositories);

const app = express();
app.use(controllers.iotDeviceController.router);
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.listen(8500, () => {
  console.log("Server is running on port 8500");
});
