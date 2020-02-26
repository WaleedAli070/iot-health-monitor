import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HeartbeatModule } from './module/heartbeat/heartbeat.module'
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    HeartbeatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
