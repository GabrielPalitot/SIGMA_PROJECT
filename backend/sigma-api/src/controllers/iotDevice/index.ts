import { Request, Response, Router } from "express";
import { IotDeviceDTO, ResponseIotDeviceDTO } from "./schema";
import IotDeviceService from "../../services/IotDevice";

class IotDeviceController {
  public router: Router;
  constructor(private readonly iotDeviceService: IotDeviceService) {
    this.router = Router();
    this.routes();
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = IotDeviceDTO.parse(req.body);
      const result = await this.iotDeviceService.createIotDevice(data);
      console.log(result);
      const parsedResult = ResponseIotDeviceDTO.parse(result);
      return res.status(201).json(parsedResult);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  public get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
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
    this.router.post("/iot-device", async (req, res) => {
      await this.create(req, res);
    });
    this.router.get("/iot-device/:id", async (req, res) => {
      await this.get(req, res);
    });
  }
}

export default IotDeviceController;
