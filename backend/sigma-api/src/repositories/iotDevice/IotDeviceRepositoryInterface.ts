import IotDevice from "../../models/IotDevice";

export interface IIotDeviceRepository {
  createIotDevice(device: Partial<IotDevice>): Promise<IotDevice>;
  findById(id: string): Promise<IotDevice | null>;
  findAll(): Promise<IotDevice[]>;
  updateIotDevice(
    id: string,
    data: Partial<IotDevice>,
  ): Promise<IotDevice | null>;
  deleteIotDevice(id: string): Promise<void>;
}
