import { Validate } from "class-validator";
import { CheckProductId } from "src/custom.validators/check.product.id";

export class ProductIdDto {
    @Validate(CheckProductId)
    productId: number;
}