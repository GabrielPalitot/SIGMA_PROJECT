import Measurement from "../models/Measurement";
import { postgresHandler } from "..";

export const MeasurementRepoManager = postgresHandler
  .getDataSource()
  .getRepository(Measurement);

class MeasurementRepository {
  private instance = MeasurementRepoManager;
}

export default MeasurementRepository;
