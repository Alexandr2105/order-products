import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CartItem } from "./cart.Item.table";
import { StatusTypeForCart } from "src/common/types/status.type.for.cart";
import { User } from "src/feature/user/tables/user.table";

@Table
export class Cart extends Model<Cart> {
    @ForeignKey(() => User)
    @Column({ allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => CartItem)
    cartItems!: CartItem[];

    @Column
    status: StatusTypeForCart;
}