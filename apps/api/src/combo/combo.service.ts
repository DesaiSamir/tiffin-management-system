import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ComboService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createComboDto: Prisma.ComboCreateInput) {
    return this.databaseService.combo.create({
      data: createComboDto,
    });
  }

  async findAll() {
    return this.databaseService.combo.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.combo.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateComboDto: Prisma.ComboUpdateInput) {
    return this.databaseService.combo.update({
      where: {
        id: id,
      },
      data: updateComboDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.combo.delete({
      where: {
        id: id,
      },
    });
  }
}
