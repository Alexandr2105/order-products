import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Sequelize } from "sequelize";
import { CartQueryRepository } from "src/queryRepository/cart.query.repository";
import { CartRepository } from "src/repositories/cart.repository";
import { OrderRepository } from "src/repositories/order.repository";
import { Order } from "src/tables/order";
import { OrderItem } from "src/tables/orderItem";
import { StatusTypeForCart } from "src/common/types/status.type.for.cart";

export class BuyProductsCommand {
    constructor(public userId: number) { }
}

@CommandHandler(BuyProductsCommand)
export class BuyProductsUseCase implements ICommandHandler<BuyProductsCommand> {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize, private readonly cartQueryRepository: CartQueryRepository, private readonly cartRepository: CartRepository, private readonly orderRepository: OrderRepository) { }

    async execute(command: BuyProductsCommand): Promise<void> {
        const transaction = await this.sequelize.transaction();
        try {
            const cartInfo = await this.cartQueryRepository.getCartByUserId(command.userId, StatusTypeForCart.pending);
            if (!cartInfo) {
                throw new BadRequestException({ field: "cart", message: "Такой корзины не существует" });
            }

            cartInfo.status = StatusTypeForCart.finish;
            await this.cartRepository.saveCart(cartInfo, transaction);

            const newOrder = Order.build({
                userId: cartInfo.userId
            })

            await this.orderRepository.createOrder(newOrder, transaction);

            for (const cartItem of cartInfo.cartItems) {

                const newOrderItem = OrderItem.build({
                    orderId: newOrder.id,
                    productId: cartItem.productId,
                    quantity: cartItem.quantity,
                    price: cartItem.product.price,
                });

                await this.orderRepository.createOrderItem(newOrderItem, transaction);
            }
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }
}