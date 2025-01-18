import PostgresDataBaseConnection from "./db/coreConnection";
import express from "express";
import { router } from "./route";
import swaggerOptions from "./config/swagger.def";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import "reflect-metadata";

export const postgresHandler = new PostgresDataBaseConnection();
postgresHandler.connect();
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.listen(8500, () => {
  console.log("Server is running on port 8500");
});
