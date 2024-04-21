import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ItemTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createItemTypeDto: Prisma.ItemTypeCreateInput) {
    return this.databaseService.itemType.create({
      data: createItemTypeDto,
    });
  }

  async findAll() {
    return this.databaseService.itemType.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.itemType.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateItemTypeDto: Prisma.ItemTypeUpdateInput) {
    return this.databaseService.itemType.update({
      where: {
        id: id,
      },
      data: updateItemTypeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.itemType.delete({
      where: {
        id: id,
      },
    });
  }
}
