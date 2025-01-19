// src/schemas.ts
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

// 1) Extende o Zod com os métodos de OpenAPI
extendZodWithOpenApi(z);

// 2) Schema de criação (Request Body)
export const CreateIotDeviceReqBody = z
  .object({
    latitude: z.number(),
    longitude: z.number(),
    id_user: z.string(),
  })
  .openapi("CreateIotDeviceReqBody", {
    description: "Schema para criação de um novo dispositivo IoT",
  });

// 3) Schema de resposta para GET /iotdevices/{id}
export const GetDeviceByIdReqParams = z
  .object({
    id: z.string().uuid(),
  })
  .openapi("GetDeviceByIdReqParams", {
    description: "Parâmetro requerido ao buscar um dispositivo por ID",
  });

export const GetDeviceByIdResBody = z
  .object({
    id_esp: z.string().uuid(),
    latitude: z.number(),
    longitude: z.number(),
    id_user: z.string(),
  })
  .openapi("GetDeviceByIdResBody", {
    description: "Schema retornado ao buscar um dispositivo por ID",
  });

// 4) (Opcional) Exportar os tipos inferidos, se precisar no código:
export type CreateIotDeviceReqBodyType = z.infer<typeof CreateIotDeviceReqBody>;
export type GetDeviceByIdResBodyType = z.infer<typeof GetDeviceByIdResBody>;
