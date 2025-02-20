import {
  MeasurementsArrayDTOType,
  MeasurementTimestampDTOType,
  ResponseMeasurementsArrayDTOType,
} from "../../controllers/measurements/schema";
import Measurement from "../../models/Measurement";
import { IMeasurementRepository } from "../../repositories/measurement/MeasurementRepositoryInterface";

export interface MeasurementTimestamp {
  id_esp: string;
  timestampInit: Date;
  timestampEnd: Date;
}

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

  async getByIoTDevice(id: string): Promise<ResponseMeasurementsArrayDTOType> {
    const result = await this.measurementRepository.findByIoTDevice(id);
    return result.map((item) => ({
      ...item,
      measurement_time: item.measurement_time.toISOString(),
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
    }));
  }

  async getMeasurementsByTimestamp(params: MeasurementTimestampDTOType) {
    const { id_esp, timestampInit, timestampEnd } = params;

    const paramsToDb: Partial<MeasurementTimestamp> = {
      id_esp,
      timestampInit: timestampInit ? new Date(timestampInit) : undefined,
      timestampEnd: timestampEnd ? new Date(timestampEnd) : undefined,
    };

    const result = await this.measurementRepository.findByTimestamp(paramsToDb);

    return result.map((item) => ({
      ...item,
      measurement_time: item.measurement_time.toISOString(),
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
    }));
  }
}

export default MeasurementService;
