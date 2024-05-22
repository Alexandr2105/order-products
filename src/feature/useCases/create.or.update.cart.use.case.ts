import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Sequelize } from "sequelize";
import { CartDto } from "src/feature/dto/cart.dto";
import { ProductQueryRepository } from "src/feature/queryRepository/product.query.repository";
import { CartRepository } from "src/feature/repositories/cart.repository";
import { ProductRepository } from "src/feature/repositories/product.repository";
import { Cart } from "src/feature/tables/cart";
import { CartItem } from "src/feature/tables/cartItem";
import { StatusTypeForCart } from "src/common/types/status.type.for.cart";

export class CreateOrUpdateCartCommand {
    constructor(public body: CartDto, public userId: number) { }
}

@CommandHandler(CreateOrUpdateCartCommand)
export class CreateOrUpdateCartUseCase implements ICommandHandler<CreateOrUpdateCartCommand> {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize, private readonly cartRepository: CartRepository, private readonly productRepository: ProductRepository, private readonly productQueryRepository: ProductQueryRepository) { }


    async execute(command: CreateOrUpdateCartCommand): Promise<void> {
        const transaction = await this.sequelize.transaction();
        try {
            const newCart = Cart.build({ userId: command.userId, status: StatusTypeForCart.pending });
            const cart = await this.cartRepository.findOrCreateCart(newCart, transaction);
            const cartItem = CartItem.build({ cartId: cart.id, productId: command.body.productId, quantity: command.body.quantity });
            await this.cartRepository.addNewProductInCart(cartItem, transaction);
            const productInfo = await this.productQueryRepository.getProductById(command.body.productId);
            if (productInfo.quantity >= command.body.quantity) {
                productInfo.quantity -= command.body.quantity;
                await this.productRepository.createProduct(productInfo, transaction);
            } else {
                throw new BadRequestException({ field: "quentity", message: "Товара больше не осталось" });
            }
            await transaction.commit();
        }
        catch (e) {
            await transaction.rollback();
            throw e;
        }
    }
}