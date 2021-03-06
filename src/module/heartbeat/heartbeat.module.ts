import { Module } from '@nestjs/common';

import { SiteModule } from '../site/site.module';
import { DatabaseModule } from '../database/database.module';
import { HeartbeatController } from './controller/heartbeat.controller';
import { HeartbeatService } from './service/heartbeat.service';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';
import { SocketUtilGateway } from '../../common/utils/socket-util/socket-util.gateway';
import { heartbeatProviders } from './service/heartbeat.provider';


@Module({
  imports: [
    SiteModule,
    DatabaseModule,
  ],
  controllers: [HeartbeatController],
  providers: [
    ...heartbeatProviders,
    HeartbeatService,
    PaginationUtilService,
    SocketUtilGateway
  ],
  exports: [
    HeartbeatService
  ]
})
export class HeartbeatModule {}
