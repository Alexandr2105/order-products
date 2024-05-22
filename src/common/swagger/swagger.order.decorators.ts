import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { schemaBadRequestForSwagger } from "src/common/types/schema.bad.request.for.swagger";
import { OrderViewModel } from "src/common/viewModels/order.view.model";

export function SwaggerDecoratorByCreateOrder(): MethodDecorator {
    return applyDecorators(
        ApiOperation({ summary: 'Crate order' }),
        ApiResponse({ status: HttpStatus.NO_CONTENT, description: "No content" }
        ),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST, schema: schemaBadRequestForSwagger
        }),
    );
}

export function SwaggerDecoratorByGetOrders(): MethodDecorator {
    return applyDecorators(
        ApiOperation({ summary: 'Get orders' }),
        ApiResponse({ status: HttpStatus.OK, type: [OrderViewModel]}
        ),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST, schema: schemaBadRequestForSwagger
        }),
    )
}