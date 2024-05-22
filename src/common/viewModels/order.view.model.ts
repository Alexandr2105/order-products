import { ApiProperty } from "@nestjs/swagger";
import { OrderItemViewModel } from "./order.item.view.model";

export class OrderViewModel {
    @ApiProperty({ type: 'number' })
    id: number;
    @ApiProperty({ type: 'number' })
    userId: number;
    @ApiProperty({ type: 'string', format: 'date-time', description: "Date of created" })
    createdAt: string;
    @ApiProperty({ type: 'string', format: 'date-time', description: "Date of update" })
    updatedAt: string;
    @ApiProperty({ type: () => [OrderItemViewModel], description: "Items in the order" })
    orderItem: OrderItemViewModel[];
}