import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sequelize } from 'sequelize-typescript';
import { Category } from './tables/category';
import { Product } from './tables/product';
import { User } from './tables/user';
import { Cart } from './tables/cart';
import { CartItem } from './tables/cartItem';
import { Order } from './tables/order';
import { OrderItem } from './tables/orderItem';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';
import { CartController } from './controllers/cart.controller';
import { CategoryQueryRepository } from './queryRepository/categorty.query.repository';
import { ProductRepository } from './repositories/product.repository';
import { CreateCategoryUseCase } from './useCases/create.category.use.case';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryRepository } from './repositories/category.repository';
import { CreateProductUseCase } from './useCases/create.product.use.case';
import { CheckCategoryId } from './custom.validators/check.category.id';
import { CheckProductId } from './custom.validators/check.product.id';
import { ProductQueryRepository } from './queryRepository/product.query.repository';
import { UserQueryRepository } from './queryRepository/users.query.repository';
import { CheckUserId } from './custom.validators/check.user.id';
import { CartRepository } from './repositories/cart.repository';
import { CartQueryRepository } from './queryRepository/cart.query.repository';
import { updateQuantityProductInCartUseCase } from './useCases/update.quantity.product.in.cart.use.case';
import { OrderController } from './controllers/order.controller';
import { BuyProductsUseCase } from './useCases/buy.products.uer.case';
import { OrderRepository } from './repositories/order.repository';
import { CreateOrUpdateCartUseCase } from './useCases/create.or.update.cart.use.case';
import { OrderQueryRepository } from './queryRepository/order.query.repository';
import { settings } from './common/settings';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: settings.POSTGRES_HOST,
        port: +settings.POSTGRES_PORT,
        username: 'postgres',
        password: settings.POSTGRES_PASSWORD,
        database: 'postgres',
      });
      sequelize.addModels([Category, Product, User, Cart, CartItem, Order, OrderItem]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

console.log({
  dialect: 'postgres',
  host: settings.POSTGRES_HOST,
  port: +settings.POSTGRES_PORT,
  username: 'postgres',
  password: settings.POSTGRES_PASSWORD,
  database: 'postgres',
});


export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useValue: Category,
  }, {
    provide: 'PRODUCT_REPOSITORY',
    useValue: Product,
  }, {
    provide: 'USER_REPOSITORY',
    useValue: User,
  }, {
    provide: 'CART_REPOSITORY',
    useValue: Cart,
  }, {
    provide: 'CART_ITEM_REPOSITORY',
    useValue: CartItem,
  }, {
    provide: 'ORDER_REPOSITORY',
    useValue: Order,
  }, {
    provide: 'ORDER_ITEM_REPOSITORY',
    useValue: OrderItem,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [AppController, CategoryController, ProductController, CartController, OrderController],
  providers: [AppService, ...databaseProviders, ...categoryProviders, CategoryQueryRepository, ProductQueryRepository, UserQueryRepository, CartQueryRepository, OrderQueryRepository, ProductRepository, CategoryRepository, CartRepository, OrderRepository, CreateCategoryUseCase, CreateProductUseCase, CreateOrUpdateCartUseCase, updateQuantityProductInCartUseCase, BuyProductsUseCase, CheckCategoryId, CheckProductId, CheckUserId],
})
export class AppModule { }
