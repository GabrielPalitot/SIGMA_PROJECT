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

export const ResponseMeasurementsArrayDTO = z.array(ResponseMeasurementDTO);

export const MeasurementsArrayDTO = z.array(MeasurementDTO);

export type MeasurementDTOType = z.infer<typeof MeasurementDTO>;
export type ResponseMeasurementDTOType = z.infer<typeof ResponseMeasurementDTO>;
export type MeasurementsArrayDTOType = z.infer<typeof MeasurementsArrayDTO>;
export type ResponseMeasurementsArrayDTOType = z.infer<
  typeof ResponseMeasurementsArrayDTO
>;
