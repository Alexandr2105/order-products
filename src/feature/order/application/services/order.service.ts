import { Injectable } from "@nestjs/common";
import { OrderQueryRepository } from "../../repositories/order.query.repository";

@Injectable()
export class OrderService {
    constructor(private readonly orderQueryRepository: OrderQueryRepository) { }

    async getOrders(startDate: Date, endDate: Date, userId: number) {
        if (startDate && endDate) {
            return this.orderQueryRepository.getQueryOrders(startDate, endDate, userId);
        } else {
            return this.orderQueryRepository.getAllOrdersForCurrentUser(userId);
        }
    }
}