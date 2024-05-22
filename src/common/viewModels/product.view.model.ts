import { ApiProperty } from "@nestjs/swagger";

export class ProductViewModel {
    @ApiProperty({ type: 'number' })
    id?: number;
    @ApiProperty({ type: 'string', description: 'Product name' })
    name: string;
    @ApiProperty({ type: 'string', description: 'Product description' })
    description: string;
    @ApiProperty({ type: 'number', description: 'Product price' })
    price: number;
    @ApiProperty({ type: 'number', description: "Product quantity" })
    quantity: number;
    @ApiProperty({ type: 'number', description: "Category in which the product is located" })
    categoryId: number;
    @ApiProperty({ type: 'string', format: 'date-time', description: "Date of update" })
    updatedAt?: string;
    @ApiProperty({ type: 'string', format: 'date-time', description: "Date of created" })
    createdAt?: string;
}