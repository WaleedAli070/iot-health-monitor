import { Controller, Get, Post, Body } from '@nestjs/common';
import { SiteService } from '../service/site.service';

@Controller('site')
export class SiteController {
  constructor(private siteService: SiteService) {}
  
  @Get()
  addNewHeartbeat () {
    return this.siteService.getAllSites()
  }
}
