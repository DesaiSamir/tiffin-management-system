import { Module } from '@nestjs/common';
import { DailyMenuService } from './daily-menu.service';
import { DailyMenuController } from './daily-menu.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DailyMenuController],
  providers: [DailyMenuService],
})
export class DailyMenuModule {}
