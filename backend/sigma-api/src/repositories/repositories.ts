import { DataSource } from "typeorm";
import IotDeviceRepository from "./IotDeviceRepository";
import MeasurementRepository from "./MeasurementRepository";

class Repositories {
  constructor(private readonly dataSource: DataSource) {}
  public iotDeviceRepository = new IotDeviceRepository(this.dataSource);
  public measurementRepository = new MeasurementRepository(this.dataSource);
}

export default Repositories;
