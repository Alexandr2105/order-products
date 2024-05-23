import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './feature/cart/cart.module';
import { CategoryModule } from './feature/category/category.module';
import { OrderModule } from './feature/order/order.module';
import { ProductModule } from './feature/product/product.module';
import { UserModule } from './feature/user/user.module';

@Module({
  imports: [CartModule, ProductModule, OrderModule, CategoryModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
