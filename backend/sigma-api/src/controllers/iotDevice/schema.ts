import { z } from "zod";

export const CreateIotDeviceDTO = z.object({
  latitude: z.number(),
  longitude: z.number(),
  id_user: z.string(),
});

export const ResponseIotDeviceDTO = z.object({
  id_esp: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  id_user: z.string(),
});

export type CreateIotDeviceDTOType = z.infer<typeof CreateIotDeviceDTO>;
export type ResponseIotDeviceDTOType = z.infer<typeof ResponseIotDeviceDTO>;
