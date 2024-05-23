import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "../../category/tables/category.table";
import { OrderItem } from "../../order/tables/order.item.table";
import { CartItem } from "../../cart/tables/cart.Item.table";

@Table
export class Product extends Model<Product> {
    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    description: string;

    @Column({ allowNull: false })
    price: number;

    @Column({ allowNull: false })
    quantity: number;

    @ForeignKey(() => Category)
    @Column({ allowNull: false })
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;

    @HasMany(() => OrderItem)
    orderItems: OrderItem[];

    @HasMany(() => CartItem)
    cartItem: CartItem[];
}