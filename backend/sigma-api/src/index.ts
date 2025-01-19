import PostgresDataBaseConnection from "./db/coreConnection";
import express from "express";
import swaggerOptions from "./config/swagger.def";
import swaggerUI from "swagger-ui-express";
import "reflect-metadata";
import Repositories from "./repositories/repositories";
import Controllers from "./controllers/controllers";

class HttpServer {
  public app: express.Application;
  constructor() {
    this.app = express();
  }

  setup() {
    const postgresDataSource = this.setupPostgresDB().getDataSource();
    const repositories = new Repositories(postgresDataSource);
    const controllers = new Controllers(repositories);
    this.setupMiddlewares();
    this.setupSwagger();
    this.setupRoutes(controllers);
  }

  setupPostgresDB(): PostgresDataBaseConnection {
    const postgresHandler = new PostgresDataBaseConnection();
    postgresHandler.connect();
    return postgresHandler;
  }

  setupMiddlewares() {
    this.app.use(express.json());
  }

  setupSwagger() {
    this.app.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerOptions.swaggerDefinition),
    );
  }

  setupRoutes(controllers: Controllers) {
    this.app.use(controllers.iotDeviceController.router);
    this.app.use(controllers.measurementController.router);
  }

  getExpressApp(): express.Application {
    return this.app;
  }
}

const httpServer = new HttpServer();
httpServer.setup();
const app = httpServer.getExpressApp();
app.listen(8500, () => {
  console.log("Server is running on port 8500");
});
