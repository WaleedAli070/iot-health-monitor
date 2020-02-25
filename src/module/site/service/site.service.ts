import { Repository } from 'typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PaginationUtilService } from '../../../shared/utils/pagination-util/pagination-util.service';
import { Site } from '../../../model/site.entity'

@Injectable()
export class SiteService {
  constructor(
    @Inject('SITE_REPOSITORY')
    private siteRepository: Repository<Site>,
    private readonly pagination: PaginationUtilService,
  ) {}
  
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

  updateSiteStatus (status) {
    // this.siteRepository.update()
  }
}
