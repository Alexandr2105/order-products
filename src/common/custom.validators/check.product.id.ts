import { Injectable, NotFoundException } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ProductQueryRepository } from "src/feature/queryRepository/product.query.repository";

@ValidatorConstraint()
@Injectable()
export class CheckProductId implements ValidatorConstraintInterface {
    constructor(private readonly product: ProductQueryRepository) { }

    async validate(productId: number) {
        const product = await this.product.getProductById(productId);
        return !!product;
    }

    defaultMessage(): string {
        return 'Такой продукт не существует';
      }
}