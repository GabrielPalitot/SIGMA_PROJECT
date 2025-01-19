import { DataSource } from "typeorm";
import IotDevice from "../models/IotDevice";

class IotDeviceRepository {
  constructor(private readonly dataSource: DataSource) {}
  private instance = this.dataSource.getRepository(IotDevice);
}

export default IotDeviceRepository;
