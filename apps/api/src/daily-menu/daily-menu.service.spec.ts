import { Test, TestingModule } from '@nestjs/testing';
import { DailyMenuService } from './daily-menu.service';

describe('DailyMenuService', () => {
  let service: DailyMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyMenuService],
    }).compile();

    service = module.get<DailyMenuService>(DailyMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
