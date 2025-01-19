import Measurement from "../../models/Measurement";

export interface IMeasurementRepository {
  createMeasurement(device: Partial<Measurement>): Promise<Measurement>;
  createMeasurements(device: Partial<Measurement>[]): Promise<Measurement[]>;
  findById(id: string): Promise<Measurement | null>;
  findAll(): Promise<Measurement[]>;
  deleteMeasurement(id: string): Promise<void>;
}
