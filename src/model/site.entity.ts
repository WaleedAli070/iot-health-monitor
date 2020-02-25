import { Entity, Column, PrimaryColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { Sensor } from './sensor.entity'
import { Heartbeat } from './heartbeat.entity';

export enum SITE_STATUS {
  OFFLINE = 'offline',
  ONLINE = 'online',
  FAULT = 'fault',
}
@Entity()
export class Site {
  @PrimaryColumn({ length: 50 })
  id: string;

  @Column({ type: 'double'})
  lat: number;

  @Column({ type: 'double'})
  long: number;

  @Column()
  status: string; //enum column [offline, online, fault]

  @UpdateDateColumn()
  lastStatusUpdate: Date

  @OneToMany(type => Sensor, sensor => sensor.site)
  sensors: Sensor[];

  @OneToMany(type => Heartbeat, heartbeat => heartbeat.site_id)
  heartbeats: Heartbeat[];
}