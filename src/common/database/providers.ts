import { Sequelize } from "sequelize-typescript";
import { settings } from "../settings";
import { Product } from "src/feature/product/tables/product.table";
import { Cart } from "src/feature/cart/tables/cart.table";
import { CartItem } from "src/feature/cart/tables/cart.Item.table";
import { Order } from "src/feature/order/tables/order.table";
import { OrderItem } from "src/feature/order/tables/order.item.table";
import { Category } from "src/feature/category/tables/category.table";
import { User } from "src/feature/user/tables/user.table";

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