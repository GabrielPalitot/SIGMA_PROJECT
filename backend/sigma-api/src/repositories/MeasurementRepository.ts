import { Repository } from "typeorm";
import Measurement from "../models/Measurement";

class MeasurementRepository extends Repository<Measurement> {}

export default MeasurementRepository;
