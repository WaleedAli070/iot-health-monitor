import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name)
  constructor() { 
    this.logger.log('App Service Initialized')
  }
  getHello(): string {
    return 'Hello World!';
  }
}
