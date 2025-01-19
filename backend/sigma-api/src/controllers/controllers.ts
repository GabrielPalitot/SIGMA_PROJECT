import IotDeviceController from "./iotDevice";
import Repositories from "../repositories/repositories";

class Controllers {
  constructor(private readonly repos: Repositories) {}
  public iotDeviceController = new IotDeviceController(
    this.repos.iotDeviceRepository,
  );
}

export default Controllers;
