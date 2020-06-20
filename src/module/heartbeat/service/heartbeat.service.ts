import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import * as moment from 'moment'
import { PaginationUtilService } from '../../../common/utils/pagination-util/pagination-util.service';
import { SocketUtilGateway } from '../../../common/utils/socket-util/socket-util.gateway';
import { Heartbeat } from '../../../model/heartbeat.entity'
import { SITE_STATUS } from '../../../model/site.entity'
import { HeartBeatDTO } from '../dto/heartbeat.dto';
import { Repository, Between } from 'typeorm';
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
  async getHeartBeatsBySiteId(id: string, params: any = {}): Promise<Pagination<Heartbeat> | Heartbeat[]> {
    const paginationOptions = this.pagination.createOptions(params);
    const query = {
      site_id: id
    };
    
    if (!paginationOptions) {
      return await this.heartbeatRepository.find(query);
    }

    let sortOptions = {}
    if (params.sortBy) {
      sortOptions = {
        order: {
          [params.sortBy]: params.sortDesc ? 'DESC' : 'ASC'
        }
      }
    }
    return await paginate<Heartbeat>(
      this.heartbeatRepository,
      paginationOptions,
      {
        where: query,
        ...sortOptions
      }
    );
  }

  /**
   * Get heart beat stats of a specific site - [avg temperature, max humidity, min humidity]
   *
   * @param {String} id - Site ID
   */
  async getHeartBeatStatsBySiteId(id: string) {
    const query = {
      site_id: id
    };
    const stats = await this.heartbeatRepository
                          .createQueryBuilder('heartbeat')
                          .select([
                            "AVG(heartbeat.temperature) as avgTemp",
                            "MAX(heartbeat.humidity) as maxHumid",
                            "MIN(heartbeat.humidity) as minHumid"
                          ])
                          .where("heartbeat.site_id = :site_id", query)
                          .getRawOne()
    return stats
  }

  /**
   * Get graph data of a specific site - [avg temperature, max humidity, min humidity]
   *
   * @param {String} id - Site ID
   */
  async getGraphDataBySiteId(id: string): Promise<Pagination<Heartbeat> | Heartbeat[]> {
    const from = moment().subtract(1, 'days').valueOf()
    const to = moment().valueOf()
    const query = {
      site_id: id,
      timestamp: Between(from, to)
    };
    const stats = await this.heartbeatRepository
                          .find({
                            where: query,
                            select: ['temperature', 'timestamp']
                          })
    return stats
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
      this.socketUtilGateway.handleSiteNewHeartbeat(data)
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
