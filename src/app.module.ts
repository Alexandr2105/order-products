import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sequelize } from 'sequelize-typescript';
import { Category } from './feature/tables/category';
import { Product } from './feature/tables/product';
import { User } from './feature/tables/user';
import { Cart } from './feature/tables/cart';
import { CartItem } from './feature/tables/cartItem';
import { Order } from './feature/tables/order';
import { OrderItem } from './feature/tables/orderItem';
import { CategoryController } from './feature/controllers/category.controller';
import { ProductController } from './feature/controllers/product.controller';
import { CartController } from './feature/controllers/cart.controller';
import { CategoryQueryRepository } from './feature/queryRepository/categorty.query.repository';
import { ProductRepository } from './feature/repositories/product.repository';
import { CreateCategoryUseCase } from './feature/useCases/create.category.use.case';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryRepository } from './feature/repositories/category.repository';
import { CreateProductUseCase } from './feature/useCases/create.product.use.case';
import { CheckCategoryId } from './common/custom.validators/check.category.id';
import { CheckProductId } from './common/custom.validators/check.product.id';
import { ProductQueryRepository } from './feature/queryRepository/product.query.repository';
import { UserQueryRepository } from './feature/queryRepository/users.query.repository';
import { CheckUserId } from './common/custom.validators/check.user.id';
import { CartRepository } from './feature/repositories/cart.repository';
import { CartQueryRepository } from './feature/queryRepository/cart.query.repository';
import { updateQuantityProductInCartUseCase } from './feature/useCases/update.quantity.product.in.cart.use.case';
import { OrderController } from './feature/controllers/order.controller';
import { BuyProductsUseCase } from './feature/useCases/buy.products.uer.case';
import { OrderRepository } from './feature/repositories/order.repository';
import { CreateOrUpdateCartUseCase } from './feature/useCases/create.or.update.cart.use.case';
import { OrderQueryRepository } from './feature/queryRepository/order.query.repository';
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
