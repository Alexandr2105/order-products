import { Module } from "@nestjs/common";
import { CheckProductId } from "src/common/custom.validators/check.product.id";
import { SharedModule } from "src/common/modules/shared.modules";
import { CreateProductUseCase } from "./application/use-cases/create.product.use.case";
import { ProductController } from "./product.controller";
import { ProductQueryRepository } from "./repositories/product.query.repository";
import { ProductRepository } from "./repositories/product.repository";
import { ProductService } from "./application/services/product.service";

@Module({
    imports: [SharedModule],
    controllers: [ProductController],
    providers: [ProductRepository, ProductQueryRepository, CreateProductUseCase, CheckProductId, ProductService],
    exports: [ProductRepository, ProductQueryRepository],
})

export class ProductModule { }