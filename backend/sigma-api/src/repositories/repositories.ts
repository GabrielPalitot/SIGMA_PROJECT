import IotDeviceRepository from "./IotDeviceRepository";
import MeasurementRepository from "./MeasurementRepository";

class Repositories {
  public iotDeviceRepository = new IotDeviceRepository();
  public measurementRepository = new MeasurementRepository();
}

export default Repositories;
