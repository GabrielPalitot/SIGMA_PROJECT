import IotDeviceController from "./iotDevice";
import Repositories from "../repositories/repositories";
import MeasurementController from "./measurements";

class Controllers {
  constructor(private readonly repos: Repositories) {}
  public iotDeviceController = new IotDeviceController(
    this.repos.iotDeviceRepository,
  );
  public measurementController = new MeasurementController(
    this.repos.measurementRepository,
  );
}

export default Controllers;
