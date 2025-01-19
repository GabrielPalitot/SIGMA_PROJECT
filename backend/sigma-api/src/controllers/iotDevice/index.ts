import { Request, Response, Router } from "express";
import { IotDeviceDTO, ResponseIotDeviceDTO } from "./schema";
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
      const parsedResult = ResponseIotDeviceDTO.parse(result);
      return res.status(201).json(parsedResult);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  public get = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.params.id;
      const result = await this.iotDeviceService.getIotDevice(id);
      if (!result) {
        return res.status(404).json({ message: "IotDevice not found" });
      }
      const parsed_result = ResponseIotDeviceDTO.parse(result);
      return res.status(200).json(parsed_result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
  public routes() {
    this.router.post("/iot-device", this.create);
    this.router.get("/iot-device/:id", this.get);
  }
}

export default IotDeviceController;
