import zodToOpenAPI from "../../utils/zodUtilitary";
import { CreateIotDeviceDTO } from "./schema";

class IotDeviceSwagger {
  private route = "/iot-device";

  public schemas = {
    CreateIotDeviceDTO: zodToOpenAPI(CreateIotDeviceDTO),
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
            schema: this.schemas.CreateIotDeviceDTO,
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
