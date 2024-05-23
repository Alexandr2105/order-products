import { Inject } from "@nestjs/common";
import { Transaction } from "sequelize";
import { Product } from "src/feature/product/tables/product.table";
import { ProductViewModel } from "src/common/viewModels/product.view.model";
import { provide } from "src/common/const/categoryProviders";

export class ProductRepository {
    constructor(@Inject(provide.productRepository) private readonly productModel: typeof Product) { }

    async createProduct(product: Product, transaction?: Transaction): Promise<ProductViewModel> {
        return product.save({ transaction });
    }
}