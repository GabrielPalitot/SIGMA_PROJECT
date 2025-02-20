import { DataSource } from "typeorm";
import Measurement from "../../models/Measurement";
import { IMeasurementRepository } from "./MeasurementRepositoryInterface";
import { MeasurementTimestamp } from "../../services/Measurement";

class MeasurementRepository implements IMeasurementRepository {
  constructor(private readonly dataSource: DataSource) {}
  private readonly instance = this.dataSource.getRepository(Measurement);

  async createMeasurements(
    measurements: Partial<Measurement>[],
  ): Promise<Measurement[]> {
    const newMeasurements = this.instance.create(measurements);
    return await this.instance.save(newMeasurements);
  }
  async createMeasurement(
    measurement: Partial<Measurement>,
  ): Promise<Measurement> {
    const newMeasurement = this.instance.create(measurement);
    return await this.instance.save(newMeasurement);
  }

  async findById(id: string): Promise<Measurement | null> {
    return await this.instance.findOneBy({ id_esp: id });
  }

  async findByIoTDevice(id: string): Promise<Measurement[]> {
    return await this.instance.find({ where: { id_esp: id } });
  }

  async findAll(): Promise<Measurement[]> {
    return await this.instance.find();
  }

  async findByTimestamp(
    params: Partial<MeasurementTimestamp>,
  ): Promise<Measurement[]> {
    const { id_esp, timestampInit, timestampEnd } = params;

    const query = this.instance
      .createQueryBuilder("measurement")
      .where("measurement.id_esp = :id_esp", { id_esp });

    if (timestampInit) {
      query.andWhere("measurement.measurement_time >= :timestampInit", {
        timestampInit,
      });
    }

    if (timestampEnd) {
      query.andWhere("measurement.measurement_time <= :timestampEnd", {
        timestampEnd,
      });
    }

    return await query.getMany();
  }

  async deleteMeasurement(id: string): Promise<void> {
    await this.instance.delete({ id_esp: id });
  }
}

export default MeasurementRepository;
