import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import IotDevice from "./IotDevice";

@Entity("measurements")
class Measurement {
  @PrimaryColumn("uuid")
  id_esp: string;

  @PrimaryColumn()
  measurement_time: Date;

  @Column({ type: "float" })
  solo_humidity: number;

  @Column({ type: "float" })
  temperature: number;

  @Column({ type: "float" })
  air_humidity: number;

  @Column({ type: "float" })
  pressure: number;

  @Column({ type: "bool" })
  has_rain: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => IotDevice, (iotDevice) => iotDevice.measurements, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_esp" })
  iotDevice: IotDevice;
}

export default Measurement;
