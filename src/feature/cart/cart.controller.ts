import { Body, Controller, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { SwaggerDecoratorByCreateOrUpdateCart, SwaggerDecoratorByUpdateProductQuantityInCart } from "src/common/swagger/swagger.cart.decorators";
import { UpdateQuantityProductInCartCommand } from "src/feature/cart/application/use-cases/update.quantity.product.in.cart.use.case";
import { CartDto } from "src/feature/cart/dto/cart.dto";
import { UserIdDto } from "../user/dto/user.id.dto";
import { CreateOrUpdateCartCommand } from "./application/use-cases/create.or.update.cart.use.case";
import { updateQuantityOfProductDto } from "./dto/update.quantity.of.product.dto";

@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(private readonly commandBus: CommandBus) { }

    @SwaggerDecoratorByCreateOrUpdateCart()
    @HttpCode(204)
    @Post(':userId')
    async createCart(@Param() param: UserIdDto, @Body() body: CartDto): Promise<void> {
        await this.commandBus.execute(new CreateOrUpdateCartCommand(body, param.userId));
    }

    @SwaggerDecoratorByUpdateProductQuantityInCart()
    @HttpCode(204)
    @Put(':userId')
    async updateQuantityProductInCart(@Param() param: UserIdDto, @Body() body: updateQuantityOfProductDto): Promise<void> {
        await this.commandBus.execute(new UpdateQuantityProductInCartCommand(body, param.userId));
    }
}