import { Module } from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { ItemTypeController } from './item-type.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemTypeController],
  providers: [ItemTypeService],
})
export class ItemTypeModule {}
