import { Repository } from "typeorm";
import IotDevice from "../models/IotDevice";

class IotDeviceRepository extends Repository<IotDevice> {}

export default IotDeviceRepository;
