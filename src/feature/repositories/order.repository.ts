import { Inject } from "@nestjs/common";
import { Transaction } from "sequelize";
import { Order } from "src/feature/tables/order";
import { OrderItem } from "src/feature/tables/orderItem";

export class OrderRepository {
    constructor(@Inject('ORDER_REPOSITORY') private readonly orderRepository: typeof Order, @Inject('ORDER_ITEM_REPOSITORY') private readonly orderItemRepository: typeof OrderItem,) { }

    async createOrder(order: Order, transaction: Transaction) {
        console.log(await order.save({ transaction }));
    }

    async createOrderItem(orderItem: OrderItem, transaction: Transaction) {
        return await orderItem.save({ transaction });
    }
}