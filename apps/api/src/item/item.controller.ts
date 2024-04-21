import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Prisma } from '@prisma/client';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: Prisma.ItemCreateInput) {
    return this.itemService.create(createItemDto);
  }

  @Post('bulk')
  createBulk(@Body() createItemsDto: Prisma.ItemCreateInput[]) {
    return this.itemService.createBulk(createItemsDto);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: Prisma.ItemUpdateInput,
  ) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Query('hard') hard: boolean) {
    return this.itemService.remove(id, hard);
  }

  @Delete()
  removeBulk(
    @Query('ids', ParseArrayPipe) ids: number[],
    @Query('hard') hard: boolean,
  ) {
    // Ensure all elements in ids array are numeric
    const numericIds = ids.map((id) => +id);
    return this.itemService.removeBulk(numericIds, hard);
  }
}
