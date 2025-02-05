import Repositories from "../repositories/repositories";
import IotDeviceService from "./IotDevice";
import MeasurementService from "./Measurement";

class Services {
  constructor(private readonly repositories: Repositories) {}
  public iotDeviceService = new IotDeviceService(
    this.repositories.iotDeviceRepository,
  );
  public measurementService = new MeasurementService(
    this.repositories.measurementRepository,
  );
}

export default Services;
