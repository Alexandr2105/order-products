import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Cart } from "./cart";
import { Order } from "./order";

@Table
export class User extends Model<User> {
    @Column({ allowNull: false })
    userName: string;

    @Column({ allowNull: false })
    email: string;

    @Column({ allowNull: false })
    password: string;

    @HasMany(() => Cart)
    cart!: Cart;

    @HasMany(() => Order)
    product!: Order;
}