import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ComboItemService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createComboItemDto: Prisma.ComboItemCreateInput) {
    return this.databaseService.comboItem.create({
      data: createComboItemDto,
    });
  }

  async findAll() {
    return this.databaseService.comboItem.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.comboItem.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateComboItemDto: Prisma.ComboItemUpdateInput) {
    return this.databaseService.comboItem.update({
      where: {
        id: id,
      },
      data: updateComboItemDto,
    });
  }

  remove(id: number) {
    return this.databaseService.comboItem.delete({
      where: {
        id: id,
      },
    });
  }
}
