import { z } from "zod";

export const IotDeviceDTO = z.object({
  latitude: z.number(),
  longitude: z.number(),
  id_identity_user: z.number(),
});

export const ResponseIotDeviceDTO = z.object({
  id_esp: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  id_identity_user: z.number(),
});

export type IotDeviceDTOType = z.infer<typeof IotDeviceDTO>;
export type ResponseIotDeviceDTOType = z.infer<typeof ResponseIotDeviceDTO>;
