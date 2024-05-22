import { Controller, Get, HttpCode, Param, Post, Query } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { Order } from "sequelize";
import { UserIdDto } from "src/feature/dto/user.id.dto";
import { OrderQueryRepository } from "src/feature/queryRepository/order.query.repository";
import { SwaggerDecoratorByCreateOrder, SwaggerDecoratorByGetOrders } from "src/common/swagger/swagger.order.decorators";
import { BuyProductsCommand } from "src/feature/useCases/buy.products.uer.case";

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private readonly commandBus: CommandBus, private readonly orderQueryRepository: OrderQueryRepository) { }

    @SwaggerDecoratorByCreateOrder()
    @HttpCode(204)
    @Post(':userId')
    async buyProducts(@Param() param: UserIdDto): Promise<void> {
        await this.commandBus.execute(new BuyProductsCommand(param.userId));
    }

    @SwaggerDecoratorByGetOrders()
    @Get(':userId')
    async getOrders(@Query('startDate') startDate: string, @Query('endDate') endDate: string, @Param() param: UserIdDto) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.orderQueryRepository.getOrders(start, end, param.userId);
    }
}