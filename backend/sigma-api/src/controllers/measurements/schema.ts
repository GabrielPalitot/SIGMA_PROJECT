import { z } from "zod";

export const MeasurementDTO = z.object({
  id_esp: z.string().uuid(),
  measurement_time: z.string().datetime({ offset: true }),
  solo_humidity: z.number(),
  temperature: z.number(),
  air_humidity: z.number(),
  pressure: z.number(),
  has_rain: z.boolean(),
});

export const MeasurementTimestampDTO = z.object({
  id_esp: z.string().uuid(),
  timestampInit: z.string().datetime({ offset: true }).optional(),
  timestampEnd: z.string().datetime({ offset: true }).optional(),
});

export const ResponseMeasurementDTO = z.object({
  id_esp: z.string().uuid(),
  measurement_time: z.string().datetime({ offset: true }),
  solo_humidity: z.number(),
  temperature: z.number(),
  air_humidity: z.number(),
  pressure: z.number(),
  has_rain: z.boolean(),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

export const getIwnResponseDTO = z.object({
  iwn: z.number(),
  irriga: z.boolean(),
});

export const getIwnReqDTO = z.object({
  id_esp: z.string().uuid(),
});

export type getIwnResponseDTOType = z.infer<typeof getIwnResponseDTO>;

export type getIwnReqDTOType = z.infer<typeof getIwnReqDTO>;
export const ResponseMeasurementsArrayDTO = z.array(ResponseMeasurementDTO);

export const MeasurementsArrayDTO = z.array(MeasurementDTO);

export type MeasurementDTOType = z.infer<typeof MeasurementDTO>;
export type MeasurementTimestampDTOType = z.infer<
  typeof MeasurementTimestampDTO
>;
export type ResponseMeasurementDTOType = z.infer<typeof ResponseMeasurementDTO>;
export type MeasurementsArrayDTOType = z.infer<typeof MeasurementsArrayDTO>;
export type ResponseMeasurementsArrayDTOType = z.infer<
  typeof ResponseMeasurementsArrayDTO
>;
