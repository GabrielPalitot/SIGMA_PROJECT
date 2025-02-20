import zodToOpenAPI from "../../utils/zodUtilitary";
import {
  IotDeviceDTO,
  ResponseIotDeviceArrayDTO,
  ResponseIotDeviceDTO,
} from "./schema";

class IotDeviceSwagger {
  private route = "/iot-device";

  public schemas = {
    IotDeviceDTO: zodToOpenAPI(IotDeviceDTO),
    ResponseIotDeviceDTO: zodToOpenAPI(ResponseIotDeviceDTO),
    ResponseIotDeviceArrayDTO: zodToOpenAPI(ResponseIotDeviceArrayDTO),
  };

  public swagger = {
    create: {
      summary: "Create a new IoT device",
      operationId: "createIotDevice",
      tags: ["IoT Devices"],
      requestBody: {
        description: "IoT Device data to create",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.IotDeviceDTO,
          },
        },
      },
      responses: {
        "201": {
          description: "IoT Device successfully created",
          content: {
            "application/json": {
              schema: this.schemas.ResponseIotDeviceDTO,
            },
          },
        },
        "500": {
          description: "Internal Server Error",
        },
      },
    },
    get: {
      summary: "GET IoT device by ID",
      operationId: "getIotDevice",
      tags: ["IoT Devices"],
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
          description: "IoT Device successfully retrieved",
          content: {
            "application/json": {
              schema: this.schemas.ResponseIotDeviceDTO,
            },
          },
        },
        "404": {
          description: "IoT Device not found",
        },
        "500": {
          description: "Internal Server Error",
        },
      },
    },
    getAllIotDevices: {
      summary: "GET All IOT Devices",
      operationId: "getAllIotDevices",
      tags: ["IoT Devices"],
      responses: {
        "200": {
          description: "Iot Devices successfully retrieved",
          content: {
            "application/json": {
              schema: this.schemas.ResponseIotDeviceArrayDTO,
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
      post: this.swagger.create,
      get: this.swagger.getAllIotDevices,
    },
    [`${this.route}/{id_esp}`]: {
      get: this.swagger.get,
    },
  };
}

export default IotDeviceSwagger;
