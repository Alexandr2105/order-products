import { Inject, Injectable } from "@nestjs/common";
import { Transaction } from "sequelize";
import { Cart } from "src/feature/tables/cart";
import { CartItem } from "src/feature/tables/cartItem";
import { StatusTypeForCart } from "src/common/types/status.type.for.cart";

@Injectable()
export class CartRepository {
    constructor(@Inject("CART_REPOSITORY") private readonly cart: typeof Cart, @Inject("CART_ITEM_REPOSITORY") private readonly cartItem: typeof CartItem) { }

    async findOrCreateCart(cart: Cart, transaction: Transaction): Promise<Cart> {
        const [infoCart] = await this.cart.findOrCreate({ where: { userId: cart.userId, status: StatusTypeForCart.pending }, transaction });
        return infoCart;
    }

    async addNewProductInCart(cartItem:CartItem, transaction?: Transaction) {
        return cartItem.save({transaction});
    }

    async saveCart(cart: Cart, transaction: Transaction){
        return cart.save({transaction});
    }
}