import {
  MeasurementsArrayDTOType,
  ResponseMeasurementsArrayDTOType,
} from "../../controllers/measurements/schema";
import Measurement from "../../models/Measurement";
import { IMeasurementRepository } from "../../repositories/measurement/MeasurementRepositoryInterface";

class MeasurementService {
  constructor(private readonly measurementRepository: IMeasurementRepository) {}
  async createMeasurements(
    params: MeasurementsArrayDTOType,
  ): Promise<ResponseMeasurementsArrayDTOType> {
    const data: Partial<Measurement>[] = params.map((item) => ({
      id_esp: item.id_esp,
      measurement_time: new Date(item.measurement_time),
      solo_humidity: item.solo_humidity,
      temperature: item.temperature,
      air_humidity: item.air_humidity,
      pressure: item.pressure,
      has_rain: item.has_rain,
    }));

    const result = await this.measurementRepository.createMeasurements(data);

    const response = result.map((item) => ({
      ...item,
      measurement_time: item.measurement_time.toISOString(),
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
    }));

    return response;
  }

  async getAll(): Promise<ResponseMeasurementsArrayDTOType> {
    const result = await this.measurementRepository.findAll();
    return result.map((item) => ({
      ...item,
      measurement_time: item.measurement_time.toISOString(),
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
    }));
  }
}

export default MeasurementService;
