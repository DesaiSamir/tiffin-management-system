import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DailyMenuService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDailyMenuDto: Prisma.DailyMenuCreateInput) {
    return this.databaseService.dailyMenu.create({
      data: createDailyMenuDto,
    });
  }

  async findAll() {
    return this.databaseService.dailyMenu.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.dailyMenu.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateDailyMenuDto: Prisma.DailyMenuUpdateInput) {
    return this.databaseService.dailyMenu.update({
      where: {
        id: id,
      },
      data: updateDailyMenuDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.dailyMenu.delete({
      where: {
        id: id,
      },
    });
  }
}
