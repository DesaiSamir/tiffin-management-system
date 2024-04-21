import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComboItemService } from './combo-item.service';
import { Prisma } from '@prisma/client';

@Controller('combo-item')
export class ComboItemController {
  constructor(private readonly comboItemService: ComboItemService) {}

  @Post()
  create(@Body() createComboItemDto: Prisma.ComboItemCreateInput) {
    return this.comboItemService.create(createComboItemDto);
  }

  @Get()
  findAll() {
    return this.comboItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comboItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComboItemDto: Prisma.ComboItemUpdateInput,
  ) {
    return this.comboItemService.update(+id, updateComboItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comboItemService.remove(+id);
  }
}
