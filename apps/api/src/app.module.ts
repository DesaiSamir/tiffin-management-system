import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ItemModule } from './item/item.module';
import { ComboModule } from './combo/combo.module';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { ComboItemModule } from './combo-item/combo-item.module';
import { DailyMenuModule } from './daily-menu/daily-menu.module';
import { ItemTypeModule } from './item-type/item-type.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { RequestLoggingMiddleware } from './request-logging.middleware';

@Module({
  imports: [
    OrderModule,
    ItemModule,
    ComboModule,
    TenantModule,
    UserModule,
    ComboItemModule,
    DailyMenuModule,
    ItemTypeModule,
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
