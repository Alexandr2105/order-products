import { Inject } from "@nestjs/common";
import { Cart } from "src/tables/cart";
import { CartItem } from "src/tables/cartItem";
import { Product } from "src/tables/product";
import { StatusTypeForCart } from "src/common/types/status.type.for.cart";

export class CartQueryRepository {
    constructor(@Inject("CART_REPOSITORY") private readonly cart: typeof Cart, @Inject("CART_ITEM_REPOSITORY") private readonly cartItem: typeof CartItem) { }

    async getCartByUserIdAndProductId(userId: number, status: StatusTypeForCart, productId: number) {
        return this.cart.findOne({ where: { userId: userId, status: status }, include: [{ model: CartItem, where: { productId: productId } }] });
    }

    async getCartByUserId(userId: number, status: StatusTypeForCart) {
        return this.cart.findOne({ where: { userId: userId, status: status }, include: [{ model: CartItem, include: [{ model: Product }] }] });
    }
}