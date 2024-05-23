import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Cart } from "src/feature/cart/tables/cart.table";
import { Order } from "src/feature/order/tables/order.table";

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