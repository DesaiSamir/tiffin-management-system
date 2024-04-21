import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { Prisma } from '@prisma/client';

@Controller('item-type')
export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Post()
  create(@Body() createItemTypeDto: Prisma.ItemTypeCreateInput) {
    return this.itemTypeService.create(createItemTypeDto);
  }

  @Get()
  findAll() {
    return this.itemTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemTypeDto: Prisma.ItemTypeUpdateInput,
  ) {
    return this.itemTypeService.update(+id, updateItemTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemTypeService.remove(+id);
  }
}
