import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { OrderItem } from "./orderItem";
import { User } from "./user";

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