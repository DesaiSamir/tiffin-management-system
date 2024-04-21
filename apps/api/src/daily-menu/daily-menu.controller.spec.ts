import { Test, TestingModule } from '@nestjs/testing';
import { DailyMenuController } from './daily-menu.controller';
import { DailyMenuService } from './daily-menu.service';

describe('DailyMenuController', () => {
  let controller: DailyMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyMenuController],
      providers: [DailyMenuService],
    }).compile();

    controller = module.get<DailyMenuController>(DailyMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
