import { EntityRepository, Repository } from 'typeorm';

import { Heartbeat } from '../model/heartbeat.entity';
import { HeartBeatDTO } from '../module/heartbeat/dto/heartbeat.dto';

@EntityRepository(Heartbeat)
export class HeartBeatRepository extends Repository<Heartbeat> {
  async newHeartBeat(body: HeartBeatDTO) {
    return await this.save(body);
  }
}
