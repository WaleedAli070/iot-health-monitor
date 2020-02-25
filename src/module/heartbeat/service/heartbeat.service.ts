import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PaginationUtilService } from '../../../shared/utils/pagination-util/pagination-util.service';
import { Heartbeat } from '../../../model/heartbeat.entity'
import { HeartBeatDTO } from '../dto/heartbeat.dto';
import { Repository } from 'typeorm';
import { SiteService } from '../../../module/site/service/site.service';

@Injectable()
export class HeartbeatService {
  constructor(
    @Inject('HEARTBEAT_REPOSITORY')
    private heartbeatRepository: Repository<Heartbeat>,
    private readonly pagination: PaginationUtilService,
    private readonly siteService: SiteService
  ) {}
  
  /**
   * Get heart beats of all sites - paginated
   *
   * @param {Object} params - params object
   */
  async getAllHeartBeats(params = {}): Promise<Pagination<Heartbeat> | Heartbeat[]> {
    const paginationOptions = this.pagination.createOptions(params);
    const query = {};

    if (!paginationOptions) {
      return await this.heartbeatRepository.find();
    }

    return await paginate<Heartbeat>(
      this.heartbeatRepository,
      paginationOptions,
      query,
    );
  }

  /**
   * Get heart beat of a specific site - paginated
   *
   * @param {Object} params - params object containing siteId
   */
  async getHeartBeatsBySiteId(params): Promise<Pagination<Heartbeat> | Heartbeat[]> {
    const paginationOptions = this.pagination.createOptions(params);
    const query = {
      site_id: params.site_id
    };

    if (!paginationOptions) {
      return await this.heartbeatRepository.find(query);
    }

    return await paginate<Heartbeat>(
      this.heartbeatRepository,
      paginationOptions,
      query,
    );
  }

  /**
   *
   * @param {HeartBeatDTO} data
   */
  async addHeartBeat(data: HeartBeatDTO) {
    try {
      const heartbeat = await this.heartbeatRepository.create(data);
      await this.heartbeatRepository.save(heartbeat)
      this.updateSiteStatusBasedOnHeartBeat(data)
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  updateSiteStatusBasedOnHeartBeat (data) {
    let siteData = {
      id: data.site_id,
      status: data.sensors[0].fault ? 'fault' : 'online'
    }
    console.log('inasd', siteData)
    this.siteService.updateSiteData(siteData)
  }
}
