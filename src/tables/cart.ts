import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./user";
import { CartItem } from "./cartItem";
import { StatusTypeForCart } from "src/common/types/status.type.for.cart";

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