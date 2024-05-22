import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Cart } from "./cart";
import { Product } from "./product";

@Table
export class CartItem extends Model<CartItem> {
    @ForeignKey(() => Cart)
    @Column({ allowNull: false })
    cartId: number;

    @BelongsTo(() => Cart)
    cart!: Cart;

    @ForeignKey(() => Product)
    @Column({ allowNull: false })
    productId: number;

    @BelongsTo(() => Product)
    product: Product;

    @Column({ allowNull: false })
    quantity: number;
}