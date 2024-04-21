import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComboService } from './combo.service';
import { Prisma } from '@prisma/client';

@Controller('combo')
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Post()
  create(@Body() createComboDto: Prisma.ComboCreateInput) {
    return this.comboService.create(createComboDto);
  }

  @Get()
  findAll() {
    return this.comboService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comboService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComboDto: Prisma.ComboUpdateInput,
  ) {
    return this.comboService.update(+id, updateComboDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comboService.remove(+id);
  }
}
