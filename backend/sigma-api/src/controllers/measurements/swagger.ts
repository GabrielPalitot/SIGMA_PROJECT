import zodToOpenAPI from "../../utils/zodUtilitary";
import {
  getIwnResponseDTO,
  MeasurementsArrayDTO,
  MeasurementTimestampDTO,
  ResponseMeasurementsArrayDTO,
} from "./schema";

class MeasurementSwagger {
  private route = "/measurements";

  public schemas = {
    MeasurementTimestampDTO: zodToOpenAPI(MeasurementTimestampDTO),
    MeasurementsArrayDTO: zodToOpenAPI(MeasurementsArrayDTO),
    ResponseMeasurementsArrayDTO: zodToOpenAPI(ResponseMeasurementsArrayDTO),
    getIwnResponseDTO: zodToOpenAPI(getIwnResponseDTO),
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
    getByIotDevice: {
      summary: "GET All Measurements By IoT Device",
      operationId: "getByIotDevice",
      tags: ["Measurements"],
      parameters: [
        {
          name: "id_esp",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The ID of the IoT device to retrieve",
        },
      ],
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
    getMeasurementsByTimestamp: {
      summary: "GET Measurements By IoT Device with Timestamp Filter",
      operationId: "getMeasurementsByTimestamp",
      tags: ["Measurements"],
      parameters: [
        {
          name: "id_esp",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The ID of the IoT device to retrieve measurements for",
        },
        {
          name: "timestampInit",
          in: "query",
          required: false,
          schema: { type: "string", format: "date-time" },
          description: "Start timestamp for filtering measurements",
        },
        {
          name: "timestampEnd",
          in: "query",
          required: false,
          schema: { type: "string", format: "date-time" },
          description: "End timestamp for filtering measurements",
        },
      ],
      responses: {
        "200": {
          description: "Measurements successfully retrieved",
          content: {
            "application/json": {
              schema: this.schemas.ResponseMeasurementsArrayDTO,
            },
          },
        },
        "400": {
          description: "Invalid parameters",
        },
        "404": {
          description: "Measurements not found",
        },
        "500": {
          description: "Internal Server Error",
        },
      },
    },
    getIwn: {
      summary: "GET IWN for IoT Device",
      operationId: "getIwn",
      tags: ["Measurements"],
      parameters: [
        {
          name: "id_esp",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The ID of the IoT device to retrieve iwn for",
        },
      ],
      responses: {
        "200": {
          description: "Iwn successfully retrieved",
          content: {
            "application/json": {
              schema: this.schemas.getIwnResponseDTO,
            },
          },
        },
        "400": {
          description: "Invalid parameters",
        },
        "404": {
          description: "Measurements not found",
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
    [`${this.route}/{id_esp}`]: {
      get: this.swagger.getByIotDevice,
    },
    [`${this.route}/{id_esp}/timestamps`]: {
      get: this.swagger.getMeasurementsByTimestamp,
    },
    [`${this.route}/{id_esp}/iwn`]: {
      get: this.swagger.getIwn,
    },
  };
}

export default MeasurementSwagger;
