import { Inject, Injectable } from "@nestjs/common";
import { Product } from "src/tables/product";
import { ProductViewModel } from "src/common/viewModels/product.view.model";

@Injectable()
export class ProductQueryRepository {
    constructor(@Inject('PRODUCT_REPOSITORY') private readonly productModel: typeof Product) { }

    async getProductById(productId: number): Promise<Product> {
        return this.productModel.findOne({ where: { id: productId } });
    }

    async getAllProductsByCategoryId(categoryId: number): Promise<Product[]> {
        return this.productModel.findAll({ where: { categoryId: categoryId } });
    }
}