import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "../../product/tables/product.table";
import { Cart } from "./cart.table";

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