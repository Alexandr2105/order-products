import { Inject, Injectable } from "@nestjs/common";
import { Transaction } from "sequelize";
import { Cart } from "src/feature/cart/tables/cart.table";
import { CartItem } from "src/feature/cart/tables/cart.Item.table";
import { StatusTypeForCart } from "src/common/types/status.type.for.cart";
import { provide } from "src/common/const/categoryProviders";

@Injectable()
export class CartRepository {
    constructor(@Inject(provide.cartRepository) private readonly cart: typeof Cart, @Inject(provide.cartItemRepository) private readonly cartItem: typeof CartItem) { }

    async findOrCreateCart(cart: Cart, transaction: Transaction): Promise<Cart> {
        const [infoCart] = await this.cart.findOrCreate({ where: { userId: cart.userId, status: StatusTypeForCart.pending }, transaction });
        return infoCart;
    }

    async addNewProductInCart(cartItem: CartItem, transaction?: Transaction) {
        return cartItem.save({ transaction });
    }

    async saveCart(cart: Cart, transaction: Transaction) {
        return cart.save({ transaction });
    }
}