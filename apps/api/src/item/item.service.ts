import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@Injectable()
export class ItemService {
  constructor(private readonly databaseService: DatabaseService) {}
  private readonly logger = new MyLoggerService();

  async create(createItemDto: Prisma.ItemCreateInput) {
    return this.databaseService.item.create({
      data: createItemDto,
    });
  }

  async createBulk(createItemsDto: Prisma.ItemCreateInput[]) {
    return this.databaseService.item.createMany({
      data: createItemsDto,
    });
  }

  async findAll() {
    return this.databaseService.item.findMany({
      include: {
        itemType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.item.findUnique({
      include: {
        itemType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateItemDto: Prisma.ItemUpdateInput) {
    return this.databaseService.item.update({
      where: {
        id: id,
      },
      data: updateItemDto,
    });
  }

  async remove(id: number, hard: boolean = false) {
    if (hard) {
      return this.databaseService.item.delete({
        where: {
          id: id,
        },
      });
    }
    return this.databaseService.item.update({
      where: {
        id: id,
      },
      data: { deletedAt: new Date() },
    });
  }

  async removeBulk(ids: number[], hard: boolean = false) {
    try {
      if (hard) {
        return this.databaseService.item.deleteMany({
          where: {
            id: {
              in: ids,
            },
          },
        });
      }
      return this.databaseService.item.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
