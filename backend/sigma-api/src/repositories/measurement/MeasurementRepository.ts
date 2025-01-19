import { DataSource } from "typeorm";
import Measurement from "../../models/Measurement";

class MeasurementRepository {
  constructor(private readonly dataSource: DataSource) {}
  private instance = this.dataSource.getRepository(Measurement);
}

export default MeasurementRepository;
