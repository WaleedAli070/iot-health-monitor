import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SensorType } from './sensorType.entity'
import { SensorModel } from './sensorModel.entity'
import { Site } from './site.entity'


export enum SENSOR_STATUS {
  OFFLINE = 'offline',
  ONLINE = 'online',
  FAULT = 'fault',
}

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  serial: string;

  @Column()
  status: string; //enum column [offline, online, fault]

  @ManyToOne(type => SensorType, type => type.sensors)
  type: SensorType;

  @ManyToOne(type => SensorModel, model => model.sensors)
  model: SensorModel;

  @ManyToOne(type => Site, site => site.sensors)
  site: Site;
}