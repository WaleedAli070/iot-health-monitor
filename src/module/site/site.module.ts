import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SiteController } from './controller/site.controller';
import { SiteService } from './service/site.service';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';
import { siteProviders } from './service/site.provider';
import { SocketUtilGateway } from '../../common/utils/socket-util/socket-util.gateway';


@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [SiteController],
  providers: [
    ...siteProviders,
    SiteService,
    PaginationUtilService,
    SocketUtilGateway
  ],
  exports: [
    SiteService
  ]
})
export class SiteModule {}
