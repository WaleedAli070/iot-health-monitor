import { Connection, Repository } from 'typeorm';
import { Heartbeat } from '../../../model/heartbeat.entity';

export const heartbeatProviders = [
  {
    provide: 'HEARTBEAT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Heartbeat),
    inject: ['DATABASE_CONNECTION'],
  },
]