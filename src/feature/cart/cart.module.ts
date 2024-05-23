import { Module } from "@nestjs/common";
import { SharedModule } from "src/common/modules/shared.modules";
import { ProductModule } from "../product/product.module";
import { CreateOrUpdateCartUseCase } from "./application/use-cases/create.or.update.cart.use.case";
import { UpdateQuantityProductInCartUseCase } from "./application/use-cases/update.quantity.product.in.cart.use.case";
import { CartController } from "./cart.controller";
import { CartQueryRepository } from "./repositories/cart.query.repository";
import { CartRepository } from "./repositories/cart.repository";

@Module({
    imports: [SharedModule, ProductModule],
    controllers: [CartController],
    providers: [CartQueryRepository, CartRepository, CreateOrUpdateCartUseCase, UpdateQuantityProductInCartUseCase],
    exports: [CartQueryRepository, CartRepository]
})

export class CartModule { }