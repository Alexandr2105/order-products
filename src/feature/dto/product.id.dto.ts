import { Validate } from "class-validator";
import { CheckProductId } from "src/common/custom.validators/check.product.id";

export class ProductIdDto {
    @Validate(CheckProductId)
    productId: number;
}