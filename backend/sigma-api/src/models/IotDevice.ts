import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Measurement from "./Measurement";

@Entity("iot_devices")
class IotDevice {
  @PrimaryGeneratedColumn("uuid")
  id_esp: string;

  @Column({ type: "float" })
  latitude: number;

  @Column({ type: "float" })
  longitude: number;

  @Column({ type: "int4" })
  id_identity_user: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Measurement, (measurement) => measurement.iotDevice)
  measurements: Measurement[];
}

export default IotDevice;
