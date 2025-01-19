import { DataSource } from "typeorm";
import IotDeviceRepository from "./iotDevice/IotDeviceRepository";
import MeasurementRepository from "./measurement/MeasurementRepository";

class Repositories {
  constructor(private readonly dataSource: DataSource) {}
  public iotDeviceRepository = new IotDeviceRepository(this.dataSource);
  public measurementRepository = new MeasurementRepository(this.dataSource);
}

export default Repositories;
