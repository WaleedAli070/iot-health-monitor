import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sensor } from './sensor.entity'

@Entity()
export class SensorModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Sensor, sensor => sensor.model)
  sensors: Sensor[];
}