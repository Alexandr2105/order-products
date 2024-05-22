import { Body, Controller, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { CartDto } from "src/dto/cart.dto";
import { updateQuantityOfProductDto } from "src/dto/update.quantity.of.product.dto";
import { UserIdDto } from "src/dto/user.id.dto";
import { SwaggerDecoratorByCreateOrUpdateCart, SwaggerDecoratorByUpdateProductQuantityInCart } from "src/common/swagger/swagger.cart.decorators";
import { CreateOrUpdateCartCommand } from "src/useCases/create.or.update.cart.use.case";
import { UpdateQuantityProductInCartCommand } from "src/useCases/update.quantity.product.in.cart.use.case";

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