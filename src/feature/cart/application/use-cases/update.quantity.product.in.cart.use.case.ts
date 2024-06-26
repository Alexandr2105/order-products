import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Sequelize } from "sequelize";
import { StatusTypeForCart } from "src/common/types/status.type.for.cart";
import { ProductQueryRepository } from "src/feature/product/repositories/product.query.repository";
import { ProductRepository } from "src/feature/product/repositories/product.repository";
import { updateQuantityOfProductDto } from "../../dto/update.quantity.of.product.dto";
import { CartRepository } from "../../repositories/cart.repository";
import { CartQueryRepository } from "../../repositories/cart.query.repository";

export class UpdateQuantityProductInCartCommand {
    constructor(public body: updateQuantityOfProductDto, public userId: number) { }
}

@CommandHandler(UpdateQuantityProductInCartCommand)
export class UpdateQuantityProductInCartUseCase implements ICommandHandler<UpdateQuantityProductInCartCommand> {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize, private readonly productQueryRepository: ProductQueryRepository, private readonly cartQueryRepository: CartQueryRepository, private readonly cartRepository: CartRepository, private readonly productRepository: ProductRepository) {
    }

    async execute(command: UpdateQuantityProductInCartCommand): Promise<any> {
        const transaction = await this.sequelize.transaction();
        try {
            const cart = await this.cartQueryRepository.getCartByUserIdAndProductId(command.userId, StatusTypeForCart.pending, command.body.productId);
            const product = await this.productQueryRepository.getProductById(command.body.productId);
            const currentProductQuantityInCart = cart.cartItems[0].quantity;
            let productDifferenceQuantity: number;

            if (currentProductQuantityInCart >= command.body.quantity) {
                productDifferenceQuantity = command.body.quantity - currentProductQuantityInCart;
            } else {
                productDifferenceQuantity = command.body.quantity - currentProductQuantityInCart;
            }

            if (productDifferenceQuantity < 0) {
                product.quantity -= productDifferenceQuantity;
                await this.productRepository.createProduct(product, transaction);
            } else if (product.quantity >= productDifferenceQuantity) {
                product.quantity -= productDifferenceQuantity;
                await this.productRepository.createProduct(product, transaction);
            } else {
                throw new BadRequestException({ field: "quantity", message: "Нет больше товаров" });
            }

            if (cart && cart.cartItems.length === 1) {
                cart.cartItems[0].quantity = command.body.quantity;
                await this.cartRepository.addNewProductInCart(cart.cartItems[0], transaction);
            } else {
                throw new BadRequestException({ field: "productId", message: "Товар не найден" });
            }

            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }
}