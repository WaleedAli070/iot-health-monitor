import * as config from 'config';
import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

const webConfig = config.get('web');

@Injectable()
export class PaginationUtilService {
  /**
   * This functions creates the options object acc for paginated
   * results.
   *
   * If 'getAll' is true pagination is not applied
   *
   * @param {Object} params - parameters attached to GET request
   */
  createOptions(params) {
    if (params.getAll) {
      return false;
    }

    const options: IPaginationOptions = {
      page: params.page ? params.page : 1,
      limit: params.limit ? params.limit : 10,
      route: `${webConfig.url}/${params.route}`,
    };

    return options;
  }
}
