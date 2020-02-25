import { Connection } from 'typeorm';
import { Site } from '../../../model/site.entity';

export const siteProviders = [
  {
    provide: 'SITE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Site),
    inject: ['DATABASE_CONNECTION'],
  },
]