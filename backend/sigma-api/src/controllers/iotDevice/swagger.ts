import zodToOpenAPI from "../../utils/zodUtilitary";
import { IotDeviceDTO } from "./schema";

class IotDeviceSwagger {
  private route = "/iot-device";

  public schemas = {
    IotDeviceDTO: zodToOpenAPI(IotDeviceDTO),
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
    },
  };
}

export default IotDeviceSwagger;
