import { Inject, Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { provide } from "src/common/const/categoryProviders";
import { OrderItem } from "src/feature/order/tables/order.item.table";
import { Order } from "src/feature/order/tables/order.table";

@Injectable()
export class OrderQueryRepository {
    constructor(@Inject(provide.orderRepository) private readonly order: typeof Order) {
    }

    async getQueryOrders(startDate: Date, endDate: Date, userId: number): Promise<Order[]> {
        return this.order.findAll({
            where: {
                userId: userId,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }, include: OrderItem
        })
    }

    async getAllOrdersForCurrentUser(userId: number) {
        return this.order.findAll({ where: { userId: userId }, include: OrderItem });
    }
}