import { ConnectionOptions } from 'typeorm';
import * as config from 'config';

const databaseConfig = config.get('database');

export const typeOrmConfig: ConnectionOptions = {
  type: databaseConfig.type,
  database: databaseConfig.database || process.env.DB_NAME,
  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
  synchronize: databaseConfig.synchronize || process.env.TYPEORM_SYNC,
  logging: databaseConfig.logging,
};
