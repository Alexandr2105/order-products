import { Cart } from "src/feature/cart/tables/cart.table";
import { CartItem } from "src/feature/cart/tables/cart.Item.table";
import { Product } from "src/feature/product/tables/product.table";
import { Order } from "src/feature/order/tables/order.table";
import { OrderItem } from "src/feature/order/tables/order.item.table";
import { Category } from "src/feature/category/tables/category.table";
import { User } from "src/feature/user/tables/user.table";

export enum provide {
    categoryRepository = 'CATEGORY_REPOSITORY',
    productRepository = 'PRODUCT_REPOSITORY',
    userRepository = 'USER_REPOSITORY',
    cartRepository = 'CART_REPOSITORY',
    cartItemRepository = 'CART_ITEM_REPOSITORY',
    orderRepository = 'ORDER_REPOSITORY',
    orderItemRepository = 'ORDER_ITEM_REPOSITORY'
}

export const categoryProviders = [
    {
        provide: provide.categoryRepository,
        useValue: Category,
    }, {
        provide: provide.productRepository,
        useValue: Product,
    }, {
        provide: provide.userRepository,
        useValue: User,
    }, {
        provide: provide.cartRepository,
        useValue: Cart,
    }, {
        provide: provide.cartItemRepository,
        useValue: CartItem,
    }, {
        provide: provide.orderRepository,
        useValue: Order,
    }, {
        provide: provide.orderItemRepository,
        useValue: OrderItem,
    },
];