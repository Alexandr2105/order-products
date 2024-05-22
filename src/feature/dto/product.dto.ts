import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, Length } from "class-validator";

export class ProductDto {
    @ApiProperty({ type: 'string', description: 'Product name' })
    @Transform(({ value }) => value.trim())
    @Length(3, 30)
    name: string;

    @ApiProperty({ type: 'string', description: 'Product description' })
    @Transform(({ value }) => value.trim())
    @Length(10, 500)
    description: string;

    @ApiProperty({ type: 'number', description: 'Product price' })
    @IsNumber()
    price: number;

    @ApiProperty({ type: 'number', description: 'Product quantity' })
    @IsNumber()
    quantity: number;
}