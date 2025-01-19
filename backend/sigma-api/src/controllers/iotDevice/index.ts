import { Request, RequestHandler, Response, Router } from "express";
import { CreateIotDeviceReqBody, CreateIotDeviceReqBodyType } from "./schema";
import IotDeviceRepository from "../../repositories/IotDeviceRepository";
import { ZodError } from "zod";

class IotDeviceController {
  public router: Router;
  public routeName = "/iotdevice";
  constructor(private readonly iotDeviceRepository: IotDeviceRepository) {
    this.router = Router();
    this.routes();
  }
  public create: RequestHandler = async (req: Request, res: Response) => {
    try {
      const data: CreateIotDeviceReqBodyType = CreateIotDeviceReqBody.parse(
        req.body,
      );
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof ZodError) {
        // Erro de validação → retornar 400 com detalhes
        res.status(400).json({ errors: error.errors });
      }
      // Caso seja qualquer outro erro, retornar 500
      res.status(500).json({ error: (error as Error).message });
    }
  };
  public routes() {
    this.router.post("/", this.create);
  }
}

export default IotDeviceController;
