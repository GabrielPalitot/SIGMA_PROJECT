import { DataSource } from "typeorm";
import { IIotDeviceRepository } from "./IotDeviceRepositoryInterface";
import IotDevice from "../../models/IotDevice";

class IotDeviceRepository implements IIotDeviceRepository {
  constructor(private readonly dataSource: DataSource) {}
  private readonly instance = this.dataSource.getRepository(IotDevice);

  async findById(id: string): Promise<IotDevice | null> {
    return await this.instance.findOneBy({ id_esp: id });
  }
  async findAll(): Promise<IotDevice[]> {
    return await this.instance.find();
  }
  async updateIotDevice(
    id: string,
    data: Partial<IotDevice>,
  ): Promise<IotDevice | null> {
    const device = await this.findById(id);
    if (!device) return null;

    const updatedDevice = this.instance.merge(device, data);
    return await this.instance.save(updatedDevice);
  }

  async deleteIotDevice(id: string): Promise<void> {
    await this.instance.delete({ id_esp: id });
  }

  async createIotDevice(device: Partial<IotDevice>): Promise<IotDevice> {
    const newDevice = this.instance.create(device);
    return await this.instance.save(newDevice);
  }
}

export default IotDeviceRepository;
