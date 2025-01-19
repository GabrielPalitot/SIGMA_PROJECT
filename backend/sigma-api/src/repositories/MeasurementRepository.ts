import Measurement from "../models/Measurement";
import { DataSource } from "typeorm";

class MeasurementRepository {
  constructor(private readonly dataSource: DataSource) {}
  private instance = this.dataSource.getRepository(Measurement);
}

export default MeasurementRepository;
