import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "./order";
import { Product } from "./product";

@Table
export class OrderItem extends Model<OrderItem> {
    @ForeignKey(() => Order)
    @Column({ allowNull: false })
    orderId: number;

    @BelongsTo(() => Order)
    order: Order;

    @ForeignKey(() => Product)
    @Column({ allowNull: false })
    productId: number;

    @BelongsTo(() => Product)
    product: Product;

    @Column({ allowNull: false })
    quantity: number;

    @Column({ allowNull: false })
    price: number;
}