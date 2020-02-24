import { createConnection } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const connection = await createConnection(typeOrmConfig)
      console.log('Database Connection: ', connection)
      return connection
    },
  },
];