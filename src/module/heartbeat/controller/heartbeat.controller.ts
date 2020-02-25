import { Controller, Get, Post, Body } from '@nestjs/common';
import { HeartbeatService } from '../service/heartbeat.service';
import { HeartBeatDTO } from '../dto/heartbeat.dto';

@Controller('heartbeat')
export class HeartbeatController {
  constructor(private heartbeatService: HeartbeatService) {}
  
  @Get()
  getAllHeartbeats (@Body() params) {
    params.route = 'heartbeat'
    return this.heartbeatService.getAllHeartBeats(params)
  }
  
  @Post()
  addNewHeartbeat (@Body() data: HeartBeatDTO) {
    console.log(data)
    return this.heartbeatService.addHeartBeat(data)
  }

}
