import { Test, TestingModule } from '@nestjs/testing';
import { PaginationUtilService } from './pagination-util.service';

describe('PaginationUtilService', () => {
  let service: PaginationUtilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationUtilService],
    }).compile();

    service = module.get<PaginationUtilService>(PaginationUtilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
