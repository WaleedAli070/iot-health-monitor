import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { HeartbeatService } from '../service/heartbeat.service';
import { HeartBeatDTO } from '../dto/heartbeat.dto';

@Controller('heartbeat')
export class HeartbeatController {
  constructor(private heartbeatService: HeartbeatService) {}
  
  @Get()
  getAllHeartbeats (@Query() params) {
    params.route = 'heartbeat'
    return this.heartbeatService.getAllHeartBeats(params)
  }

  @Get('site/:siteId')
  getHeartbeatsBySiteId(@Param('siteId') siteId: string, @Query() params) {
    params.route = `heartbeat/site/${siteId}`
    return this.heartbeatService.getHeartBeatsBySiteId(siteId, params)
  }

  @Post()
  addNewHeartbeat (@Body() data: HeartBeatDTO) {
    console.log(data)
    return this.heartbeatService.addHeartBeat(data)
  }

}
