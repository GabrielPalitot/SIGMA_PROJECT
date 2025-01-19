import { Request, Response, Router } from "express";
import { CreateIotDeviceDTOType } from "./schema";
import IotDeviceRepository from "../../repositories/IotDeviceRepository";

class IotDeviceController {
  public router: Router;
  constructor(private readonly iotDeviceRepository: IotDeviceRepository) {
    this.router = Router();
    this.routes();
  }
  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      const data = req.body as CreateIotDeviceDTOType;
      return res.status(201).json(data);
    } catch (error) { 
      return res.status(500).json({ error: error.message });
    }
  };
  public routes() {
    this.router.post("/iot-device", this.create);
  }
}

export default IotDeviceController;
