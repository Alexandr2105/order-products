import { Inject, Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { Order } from "src/tables/order";
import { OrderItem } from "src/tables/orderItem";

@Injectable()
export class OrderQueryRepository {
    constructor(@Inject('ORDER_REPOSITORY') private readonly order: typeof Order) {
    }

    async getOrders(startDate: Date, endDate: Date, userId: number): Promise<Order[]> {
        if (startDate && endDate) {
            return this.order.findAll({
                where: {
                    userId: userId,
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }, include: OrderItem
            })
        } else {
            return this.order.findAll({ where: { userId: userId }, include: OrderItem });
        }
    }
}