import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PaginationUtilService } from '../../../shared/utils/pagination-util/pagination-util.service';
import { SocketUtilGateway } from '../../../shared/utils/socket-util/socket-util.gateway';
import { Heartbeat } from '../../../model/heartbeat.entity'
import { SITE_STATUS } from '../../../model/site.entity'
import { HeartBeatDTO } from '../dto/heartbeat.dto';
import { Repository } from 'typeorm';
import { SiteService } from '../../../module/site/service/site.service';

@Injectable()
export class HeartbeatService {
  constructor(
    @Inject('HEARTBEAT_REPOSITORY')
    private heartbeatRepository: Repository<Heartbeat>,
    private readonly pagination: PaginationUtilService,
    private readonly siteService: SiteService,
    private socketUtilGateway: SocketUtilGateway
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
   * @param {String} id - Site ID
   * @param {Object} params - params object
   */
  async getHeartBeatsBySiteId(id: string, params = {}): Promise<Pagination<Heartbeat> | Heartbeat[]> {
    const paginationOptions = this.pagination.createOptions(params);
    const query = {
      site_id: id
    };
    console.log('inside site heartbeats', query)
    if (!paginationOptions) {
      return await this.heartbeatRepository.find(query);
    }

    return await paginate<Heartbeat>(
      this.heartbeatRepository,
      paginationOptions,
      {
        where: query
      },
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
      status: data.sensors[0].fault ? SITE_STATUS.FAULT : SITE_STATUS.ONLINE
    }
    this.siteService.updateSiteData(siteData)
    this.socketUtilGateway.handleSiteStatusChange(siteData)
  }
}
