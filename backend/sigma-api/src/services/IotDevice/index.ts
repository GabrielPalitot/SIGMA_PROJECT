import { IotDeviceDTOType } from "../../controllers/iotDevice/schema";
import { IIotDeviceRepository } from "../../repositories/iotDevice/IotDeviceRepositoryInterface";
class IotDeviceService {
  constructor(private readonly iotDeviceRepository: IIotDeviceRepository) {}

  async createIotDevice(params: IotDeviceDTOType) {
    return this.iotDeviceRepository.createIotDevice(params);
  }

  async getIotDevice(params: string) {
    return this.iotDeviceRepository.findById(params);
  }

  async getIotDevices() {
    return this.iotDeviceRepository.findAll();
  }

  async updateIotDevice(id: string, iotDevice: Partial<IotDeviceDTOType>) {
    return this.iotDeviceRepository.updateIotDevice(id, iotDevice);
  }

  async deleteIotDevice(id: string) {
    return this.iotDeviceRepository.deleteIotDevice(id);
  }
}

export default IotDeviceService;
