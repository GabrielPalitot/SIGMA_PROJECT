import { Request, Response, Router } from "express";
import MeasurementService from "../../services/Measurement";
import {
  MeasurementsArrayDTO,
  MeasurementTimestampDTO,
  ResponseMeasurementsArrayDTO,
} from "./schema";

class MeasurementController {
  public router: Router;

  constructor(private readonly measurementService: MeasurementService) {
    this.router = Router();
    this.routes();
  }

  public createMeasurements = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const measurements = MeasurementsArrayDTO.parse(req.body);
      const result =
        await this.measurementService.createMeasurements(measurements);
      const parsedResult = ResponseMeasurementsArrayDTO.parse(result);
      console.log(parsedResult);

      return res.status(201).json(parsedResult);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  public getAllMeasurements = async (
    req: Request,
    res: Response,
  ): Promise<any> => {
    try {
      const result = await this.measurementService.getAll();
      const parsedResult = ResponseMeasurementsArrayDTO.parse(result);

      return res.status(200).json(parsedResult);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  public getByIoTDevice = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id_esp } = req.params;

      const result = await this.measurementService.getByIoTDevice(id_esp);
      const parsedResult = ResponseMeasurementsArrayDTO.parse(result);

      return res.status(200).json(parsedResult);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  public getMeasurementsByTimestamp = async (
    req: Request,
    res: Response,
  ): Promise<any> => {
    try {
      const params = MeasurementTimestampDTO.parse({
        ...req.params,
        ...req.query,
      });

      const result =
        await this.measurementService.getMeasurementsByTimestamp(params);

      const parsedResult = ResponseMeasurementsArrayDTO.parse(result);

      return res.status(200).json(parsedResult);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  public routes() {
    this.router.post("/measurements", async (req: Request, res: Response) => {
      await this.createMeasurements(req, res);
    });
    this.router.get(
      "/measurements/all",
      async (req: Request, res: Response) => {
        await this.getAllMeasurements(req, res);
      },
    );
    this.router.get(
      "/measurements/:id_esp",
      async (req: Request, res: Response) => {
        await this.getByIoTDevice(req, res);
      },
    );

    this.router.get(
      "/measurements/:id_esp/timestamps",
      async (req: Request, res: Response) => {
        await this.getMeasurementsByTimestamp(req, res);
      },
    );
  }
}

export default MeasurementController;
