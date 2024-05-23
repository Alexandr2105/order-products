import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { OrderItem } from "./order.item.table";
import { User } from "src/feature/user/tables/user.table";

@Table
export class Order extends Model<Order> {
    @ForeignKey(() => User)
    @Column({ allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => OrderItem)
    orderItem: OrderItem[];
}