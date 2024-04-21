import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TenantService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTenantDto: Prisma.TenantCreateInput) {
    return this.databaseService.tenant.create({
      data: createTenantDto,
    });
  }

  async findAll() {
    return this.databaseService.tenant.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.tenant.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTenantDto: Prisma.TenantUpdateInput) {
    return this.databaseService.tenant.update({
      where: {
        id: id,
      },
      data: updateTenantDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.tenant.delete({
      where: {
        id: id,
      },
    });
  }
}
