import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "./category";
import { OrderItem } from "./orderItem";
import { CartItem } from "./cartItem";

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