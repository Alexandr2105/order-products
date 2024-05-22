import { Inject } from "@nestjs/common";
import { Transaction } from "sequelize";
import { Product } from "src/feature/tables/product";
import { ProductViewModel } from "src/common/viewModels/product.view.model";

export class ProductRepository {
    constructor(@Inject('PRODUCT_REPOSITORY') private readonly productModel: typeof Product) { }

    async createProduct(product: Product,transaction?:Transaction): Promise<ProductViewModel> {
        return product.save({transaction});
    }
}