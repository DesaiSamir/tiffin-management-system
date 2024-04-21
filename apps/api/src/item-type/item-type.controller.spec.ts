import { Test, TestingModule } from '@nestjs/testing';
import { ItemTypeController } from './item-type.controller';
import { ItemTypeService } from './item-type.service';

describe('ItemTypeController', () => {
  let controller: ItemTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemTypeController],
      providers: [ItemTypeService],
    }).compile();

    controller = module.get<ItemTypeController>(ItemTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
