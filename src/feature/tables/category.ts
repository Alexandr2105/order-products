import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Product } from "./product";

@Table
export class Category extends Model<Category> {
  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @HasMany(() => Product)
  product!: Product[];
}