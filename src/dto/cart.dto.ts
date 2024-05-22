import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Validate } from "class-validator";
import { CheckProductId } from "src/custom.validators/check.product.id";

export class CartDto {
    @ApiProperty({ type: 'number' })
    @IsNumber()
    @Validate(CheckProductId)
    productId: number;
    @ApiProperty({ type: 'number', description: 'Product quantity' })
    @IsNumber()
    quantity: number;
}