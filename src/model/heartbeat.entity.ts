import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Site } from './site.entity';

@Entity('heartbeat')
export class Heartbeat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'humidity', type: 'float'})
  humidity: number;

  @Column({name: 'temperature', type: 'float'})
  temperature: number;

  @CreateDateColumn({ name: 'timestamp' })
  timestamp: Date;

  @ManyToOne(type => Site, site => site.heartbeats)
  site_id: string;
}