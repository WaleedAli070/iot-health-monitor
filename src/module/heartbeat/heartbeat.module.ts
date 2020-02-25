import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { HeartbeatController } from './controller/heartbeat.controller';
import { HeartbeatService } from './service/heartbeat.service';
import { PaginationUtilService } from '../../shared/utils/pagination-util/pagination-util.service';
import { heartbeatProviders } from './service/heartbeat.provider';


@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [HeartbeatController],
  providers: [
    ...heartbeatProviders,
    HeartbeatService,
    PaginationUtilService
  ],
  exports: [
    HeartbeatService
  ]
})
export class HeartbeatModule {}
