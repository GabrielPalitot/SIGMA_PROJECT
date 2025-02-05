import IotDeviceController from "./iotDevice";
import MeasurementController from "./measurements";
import Services from "../services/services";

class Controllers {
  constructor(private readonly services: Services) {}
  public iotDeviceController = new IotDeviceController(
    this.services.iotDeviceService,
  );
  public measurementController = new MeasurementController(
    this.services.measurementService,
  );
}

export default Controllers;
