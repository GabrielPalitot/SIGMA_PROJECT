import { postgresHandler } from "../..";
import IotDeviceRepository from "../../repositories/IotDeviceRepository";
class IotDeviceService {
  constructor(readonly iotDeviceRepository: IotDeviceRepository) {}

  async createIotDevice(iotDevice) {
    return this.iotDeviceRepository.createIotDevice(iotDevice);
  }

  async getIotDevice(iotDeviceId) {
    return this.iotDeviceRepository.getIotDevice(iotDeviceId);
  }

  async getIotDevices() {
    return this.iotDeviceRepository.getIotDevices();
  }

  async updateIotDevice(iotDeviceId, iotDevice) {
    return this.iotDeviceRepository.updateIotDevice(iotDeviceId, iotDevice);
  }

  async deleteIotDevice(iotDeviceId) {
    return this.iotDeviceRepository.deleteIotDevice(iotDeviceId);
  }
}
