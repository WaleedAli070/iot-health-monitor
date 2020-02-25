import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteModule } from './module/site/site.module'
import { HeartbeatModule } from './module/heartbeat/heartbeat.module'

@Module({
  imports: [
    SiteModule,
    HeartbeatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
