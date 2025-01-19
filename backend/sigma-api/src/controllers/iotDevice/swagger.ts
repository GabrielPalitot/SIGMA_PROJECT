// swagger.ts
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import {
  CreateIotDeviceReqBody,
  GetDeviceByIdReqParams,
  GetDeviceByIdResBody,
} from "./schema";

const registry = new OpenAPIRegistry();

// 1) Registrar schemas no registry
registry.register("CreateIotDeviceReqBody", CreateIotDeviceReqBody);
registry.register("GetDeviceByIdResBody", GetDeviceByIdResBody);
registry.register("GetDeviceByIdReqParams", GetDeviceByIdReqParams);

// 2) Registrar informações de rota (opcional): também é possível mapear rotas no registry
registry.registerPath({
  method: "post",
  path: "/iot-device",
  description: "Cria um novo dispositivo IoT",
  summary: "Cria um dispositivo IoT",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateIotDeviceReqBody,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Dispositivo criado com sucesso",
    },
    400: {
      description: "Erro de validação",
    },
    500: {
      description: "Erro interno do servidor",
    },
  },
  tags: ["IotDevices"],
});

registry.registerPath({
  method: "get",
  path: "/iot-device/{id}",
  description: "Busca um dispositivo IoT pelo ID",
  summary: "Obtém um dispositivo IoT",
  request: {
    params: GetDeviceByIdReqParams,
  },
  responses: {
    200: {
      description: "Dispositivo encontrado",
      content: {
        "application/json": {
          schema: GetDeviceByIdResBody,
        },
      },
    },
    404: {
      description: "Não encontrado",
    },
  },
  tags: ["IotDevices"],
});

// 3) Gerar o documento OpenAPI
const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDoc = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "API IoT",
    version: "1.0.0",
  },
  servers: [{ url: "http://localhost:3000" }],
});
