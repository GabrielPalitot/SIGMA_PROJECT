import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("measurements")
class Measurement {
  @PrimaryGeneratedColumn("uuid")
  id_esp: string;

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

  @Column()
  measurement_time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Measurement;
