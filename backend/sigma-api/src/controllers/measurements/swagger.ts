import zodToOpenAPI from "../../utils/zodUtilitary";
import { MeasurementsArrayDTO, ResponseMeasurementsArrayDTO } from "./schema";

class MeasurementSwagger {
  private route = "/measurements";

  public schemas = {
    MeasurementsArrayDTO: zodToOpenAPI(MeasurementsArrayDTO),
    ResponseMeasurementsArrayDTO: zodToOpenAPI(ResponseMeasurementsArrayDTO),
  };

  public swagger = {
    createMeasurements: {
      summary: "Create a new Measurement",
      operationId: "createMeasurement",
      tags: ["Measurements"],
      requestBody: {
        description: "Create Measurement Data",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.MeasurementsArrayDTO,
          },
        },
      },
      responses: {
        "201": {
          description: "Measurement successfully created",
          content: {
            "application/json": {
              schema: this.schemas.ResponseMeasurementsArrayDTO,
            },
          },
        },
        "500": {
          description: "Internal Server Error",
        },
      },
    },
    getAllMeasurements: {
      summary: "GET All Measurements",
      operationId: "getAllMeasurements",
      tags: ["Measurements"],
      responses: {
        "200": {
          description: "Measurement successfully retrieved",
          content: {
            "application/json": {
              schema: this.schemas.ResponseMeasurementsArrayDTO,
            },
          },
        },
        "404": {
          description: "Measurement not found",
        },
        "500": {
          description: "Internal Server Error",
        },
      },
    },
  };

  public swaggerController = {
    [`${this.route}`]: {
      post: this.swagger.createMeasurements,
    },
    [`${this.route}/all`]: {
      get: this.swagger.getAllMeasurements,
    },
  };
}

export default MeasurementSwagger;
