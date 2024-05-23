import { Inject } from "@nestjs/common";
import { Cart } from "src/feature/cart/tables/cart.table";
import { CartItem } from "src/feature/cart/tables/cart.Item.table";
import { Product } from "src/feature/product/tables/product.table";
import { StatusTypeForCart } from "src/common/types/status.type.for.cart";
import { provide } from "src/common/const/categoryProviders";

export class CartQueryRepository {
    constructor(@Inject(provide.cartRepository) private readonly cart: typeof Cart, @Inject(provide.cartItemRepository) private readonly cartItem: typeof CartItem) { }

    async getCartByUserIdAndProductId(userId: number, status: StatusTypeForCart, productId: number) {
        return this.cart.findOne({ where: { userId: userId, status: status }, include: [{ model: CartItem, where: { productId: productId } }] });
    }

    async getCartByUserId(userId: number, status: StatusTypeForCart) {
        return this.cart.findOne({ where: { userId: userId, status: status }, include: [{ model: CartItem, include: [{ model: Product }] }] });
    }
}