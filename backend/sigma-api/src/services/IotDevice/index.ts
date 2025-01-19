import {
  IotDeviceDTOType,
  ResponseIotDeviceDTOType,
} from "../../controllers/iotDevice/schema";
import { IIotDeviceRepository } from "../../repositories/iotDevice/IotDeviceRepositoryInterface";
class IotDeviceService {
  constructor(private readonly iotDeviceRepository: IIotDeviceRepository) {}

  async createIotDevice(
    params: IotDeviceDTOType,
  ): Promise<ResponseIotDeviceDTOType> {
    const data = await this.iotDeviceRepository.createIotDevice(params);
    const response: ResponseIotDeviceDTOType = {
      id_esp: data.id_esp,
      latitude: data.latitude,
      longitude: data.longitude,
      id_identity_user: data.id_identity_user,
      created_at: data.created_at.toString(),
      updated_at: data.updated_at.toString(),
    };
    return response;
  }

  async getIotDevice(params: string): Promise<ResponseIotDeviceDTOType | null> {
    const data = await this.iotDeviceRepository.findById(params);
    if (!data) return null;
    const response: ResponseIotDeviceDTOType = {
      id_esp: data.id_esp,
      latitude: data.latitude,
      longitude: data.longitude,
      id_identity_user: data.id_identity_user,
      created_at: data.created_at.toString(),
      updated_at: data.updated_at.toString(),
    };
    return response;
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
