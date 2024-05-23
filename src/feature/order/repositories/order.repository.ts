import { Inject } from "@nestjs/common";
import { Transaction } from "sequelize";
import { provide } from "src/common/const/categoryProviders";
import { OrderItem } from "src/feature/order/tables/order.item.table";
import { Order } from "src/feature/order/tables/order.table";

export class OrderRepository {
    constructor(@Inject(provide.orderRepository) private readonly orderRepository: typeof Order, @Inject(provide.orderItemRepository) private readonly orderItemRepository: typeof OrderItem) { }

    async createOrder(order: Order, transaction: Transaction) {
        await order.save({ transaction });
    }

    async createOrderItem(orderItem: OrderItem, transaction: Transaction) {
        return await orderItem.save({ transaction });
    }
}