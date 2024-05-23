import { Controller, Get, HttpCode, Param, Post, Query } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { SwaggerDecoratorByCreateOrder, SwaggerDecoratorByGetOrders } from "src/common/swagger/swagger.order.decorators";
import { BuyProductsCommand } from "src/feature/order/application/use-cases/buy.products.use.case";
import { UserIdDto } from "../user/dto/user.id.dto";
import { OrderService } from "./application/services/order.service";

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private readonly commandBus: CommandBus, private readonly orderService: OrderService) { }

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
        return this.orderService.getOrders(start, end, param.userId);
    }
}