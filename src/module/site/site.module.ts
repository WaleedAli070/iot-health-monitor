import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { HeartbeatModule } from '../heartbeat/heartbeat.module'
import { SiteController } from './controller/site.controller';
import { SiteService } from './service/site.service';
import { PaginationUtilService } from '../../shared/utils/pagination-util/pagination-util.service';
import { siteProviders } from './service/site.provider';


@Module({
  imports: [
    DatabaseModule,
    HeartbeatModule
  ],
  controllers: [SiteController],
  providers: [
    ...siteProviders,
    SiteService,
    PaginationUtilService
  ]
})
export class SiteModule {}
