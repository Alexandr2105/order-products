import { Injectable } from "@nestjs/common";
import { ProductQueryRepository } from "../../repositories/product.query.repository";

@Injectable()
export class ProductService {
    constructor(private readonly productQueryRepository: ProductQueryRepository) { }

    async getAllProductsForCategory(categoryId: number) {
        return this.productQueryRepository.getAllProductsByCategoryId(categoryId);
    }
}