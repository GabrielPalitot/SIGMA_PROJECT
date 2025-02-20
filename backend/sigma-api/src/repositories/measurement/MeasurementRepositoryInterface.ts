import Measurement from "../../models/Measurement";
import { MeasurementTimestamp } from "../../services/Measurement";

export interface IMeasurementRepository {
  createMeasurement(device: Partial<Measurement>): Promise<Measurement>;
  createMeasurements(device: Partial<Measurement>[]): Promise<Measurement[]>;
  findById(id: string): Promise<Measurement | null>;
  findByIoTDevice(id: string): Promise<Measurement[]>;
  findAll(): Promise<Measurement[]>;
  findByTimestamp(
    params: Partial<MeasurementTimestamp>,
  ): Promise<Measurement[]>;
  deleteMeasurement(id: string): Promise<void>;
}
