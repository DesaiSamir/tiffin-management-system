import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DailyMenuService } from './daily-menu.service';
import { Prisma } from '@prisma/client';

@Controller('daily-menu')
export class DailyMenuController {
  constructor(private readonly dailyMenuService: DailyMenuService) {}

  @Post()
  create(@Body() createDailyMenuDto: Prisma.DailyMenuCreateInput) {
    return this.dailyMenuService.create(createDailyMenuDto);
  }

  @Get()
  findAll() {
    return this.dailyMenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyMenuService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDailyMenuDto: Prisma.DailyMenuUpdateInput,
  ) {
    return this.dailyMenuService.update(+id, updateDailyMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyMenuService.remove(+id);
  }
}
