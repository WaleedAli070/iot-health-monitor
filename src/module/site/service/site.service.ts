import { Repository } from 'typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Injectable, HttpException, HttpStatus, Inject, OnModuleInit } from '@nestjs/common';
import { PaginationUtilService } from '../../../shared/utils/pagination-util/pagination-util.service';
import { Site } from '../../../model/site.entity'
import { Heartbeat } from '../../../model/heartbeat.entity'
import { HeartbeatService } from '../../../module/heartbeat/service/heartbeat.service';

@Injectable()
export class SiteService implements OnModuleInit {
  constructor(
    @Inject('SITE_REPOSITORY')
    private siteRepository: Repository<Site>,
    private readonly pagination: PaginationUtilService,
    private readonly hearbeatService: HeartbeatService
  ) {}
  

  onModuleInit() {
    console.log('inside onModuleInit')
    setInterval(async () => {
      await this.siteHealthCheck()
    }, 30000)
  }
  /**
   * Get all sites - paginated
   *
   * @param {Object} params - params object
   */
  async getAllSites(params = {}): Promise<Pagination<Site> | Site[]> {
    const paginationOptions = this.pagination.createOptions(params);
    const query = {};

    if (!paginationOptions) {
      return await this.siteRepository.find();
    }

    return await paginate<Site>(
      this.siteRepository,
      paginationOptions,
      query,
    );
  }

  /**
   * Get Site Info by Id
   *
   * @param {Object} params - params object
   */
  async getSiteById(params): Promise<Site> {
    return await this.siteRepository.findOne(params.siteId);
  }

  /**
   * Get Site Heartbeat by Id
   *
   * @param {Object} params - params object
   */
  async getSiteHeartbeatById(params): Promise<Pagination<Heartbeat> | Heartbeat[]> {
    return await this.hearbeatService.getHeartBeatsBySiteId(params);
  }

  updateSiteStatus (status) {
    // this.siteRepository.update()
  }

  private async siteHealthCheck () {
    const sites = await this.siteRepository.find()
    sites.map(site => {
      const now = Date.now()
      const siteDate = new Date(site.lastStatusUpdate).getTime()
      const difference = (now - siteDate)
      const differenceInSeconds = difference / 1000;
      console.log('=================================', differenceInSeconds)
      if (differenceInSeconds > 40) {  // Maximum threshold value after which it's safe to consider that the site is offline
        console.log(`${site.id} is Offline`)
      }
    })
  }
}
