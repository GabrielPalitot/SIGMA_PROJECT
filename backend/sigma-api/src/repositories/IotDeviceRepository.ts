import IotDevice from "../models/IotDevice";
import { postgresHandler } from "..";

export const IotDeviceRepoManager = postgresHandler
  .getDataSource()
  .getRepository(IotDevice);

class IotDeviceRepository {
  private instance = IotDeviceRepoManager;
}

export default IotDeviceRepository;
