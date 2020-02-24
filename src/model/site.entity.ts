import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Sensor } from './sensor.entity'
import { Heartbeat } from './heartbeat.entity';

@Entity()
export class Site {
  @PrimaryColumn({ length: 50 })
  id: string;

  @Column({ type: 'double'})
  lat: number;

  @Column({ type: 'double'})
  long: number;

  @OneToMany(type => Sensor, sensor => sensor.site)
  sensors: Sensor[];

  @OneToMany(type => Heartbeat, heartbeat => heartbeat.site_id)
  heartbeats: Heartbeat[];
}