import { z } from "zod";

export const IotDeviceDTO = z.object({
  latitude: z.number(),
  longitude: z.number(),
  id_identity_user: z.number(),
});

export const ResponseIotDeviceDTO = z.object({
  id_esp: z.string().uuid(),
  state: z.string(),
  city: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id_identity_user: z.number(),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

export const ResponseIotDeviceArrayDTO = z.array(ResponseIotDeviceDTO);

export type ResponseIotDeviceArrayDTOType = z.infer<
  typeof ResponseIotDeviceArrayDTO
>;
export type IotDeviceDTOType = z.infer<typeof IotDeviceDTO>;
export type ResponseIotDeviceDTOType = z.infer<typeof ResponseIotDeviceDTO>;
