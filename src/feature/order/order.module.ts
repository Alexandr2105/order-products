import { Module } from "@nestjs/common";
import { SharedModule } from "src/common/modules/shared.modules";
import { CartModule } from "../cart/cart.module";
import { BuyProductsUseCase } from "./application/use-cases/buy.products.use.case";
import { OrderController } from "./order.controller";
import { OrderQueryRepository } from "./repositories/order.query.repository";
import { OrderRepository } from "./repositories/order.repository";
import { OrderService } from "./application/services/order.service";

@Module({
    imports: [SharedModule, CartModule],
    controllers: [OrderController],
    providers: [OrderQueryRepository, OrderRepository, BuyProductsUseCase, OrderService],
    exports: []
})

export class OrderModule { }