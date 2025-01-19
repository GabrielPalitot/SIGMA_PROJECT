import { Request, Response, Router } from "express";
import { IotDeviceDTO, IotDeviceDTOType } from "./schema";
import IotDeviceService from "../../services/IotDevice";
import { IIotDeviceRepository } from "../../repositories/iotDevice/IotDeviceRepositoryInterface";

class IotDeviceController {
  public router: Router;
  public iotDeviceService = new IotDeviceService(this.iotDeviceRepository);
  constructor(private readonly iotDeviceRepository: IIotDeviceRepository) {
    this.router = Router();
    this.routes();
  }
  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      const data = IotDeviceDTO.parse(req.body);
      const result = await this.iotDeviceService.createIotDevice(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
  public routes() {
    this.router.post("/iot-device", this.create);
  }
}

export default IotDeviceController;
