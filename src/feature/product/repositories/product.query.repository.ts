import { Inject, Injectable } from "@nestjs/common";
import { Product } from "src/feature/product/tables/product.table";
import { ProductViewModel } from "src/common/viewModels/product.view.model";
import { provide } from "src/common/const/categoryProviders";

@Injectable()
export class ProductQueryRepository {
    constructor(@Inject(provide.productRepository) private readonly productModel: typeof Product) { }

    async getProductById(productId: number): Promise<Product> {
        return this.productModel.findOne({ where: { id: productId } });
    }

    async getAllProductsByCategoryId(categoryId: number): Promise<Product[]> {
        return this.productModel.findAll({ where: { categoryId: categoryId } });
    }
}