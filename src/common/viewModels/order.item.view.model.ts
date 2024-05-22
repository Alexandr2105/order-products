import { ApiProperty } from "@nestjs/swagger";

export class OrderItemViewModel {
    @ApiProperty({ type: 'number' })
    id?: number;
    @ApiProperty({ type: 'number' })
    orderId: number;
    @ApiProperty({ type: 'number', description: 'Product id' })
    productId: number;
    @ApiProperty({ type: 'number', description: 'Product price' })
    price: number;
    @ApiProperty({ type: 'number', description: "Product quantity" })
    quantity: number;
    @ApiProperty({ type: 'string', format: 'date-time', description: "Date of update" })
    updatedAt?: string;
    @ApiProperty({ type: 'string', format: 'date-time', description: "Date of created" })
    createdAt?: string;
}