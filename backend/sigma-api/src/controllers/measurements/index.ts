import { Request, Response, Router } from "express";
import { IMeasurementRepository } from "../../repositories/measurement/MeasurementRepositoryInterface";
import MeasurementService from "../../services/Measurement";
import { MeasurementsArrayDTO, ResponseMeasurementsArrayDTO } from "./schema";

class MeasurementController {
  public router: Router;
  public measurementService = new MeasurementService(
    this.measurementRepository,
  );
  constructor(private readonly measurementRepository: IMeasurementRepository) {
    this.router = Router();
    this.routes();
  }
  public createMeasurements = async (
    req: Request,
    res: Response,
  ): Promise<any> => {
    try {
      const measurements = MeasurementsArrayDTO.parse(req.body);
      const result =
        await this.measurementService.createMeasurements(measurements);
      const parsedResult = ResponseMeasurementsArrayDTO.parse(result);
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
  public routes() {
    this.router.post("/measurements", this.createMeasurements);
    this.router.get("/measurements/all", this.getAllMeasurements);
  }
}

export default MeasurementController;
