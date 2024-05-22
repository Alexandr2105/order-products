import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { schemaBadRequestForSwagger } from "src/common/types/schema.bad.request.for.swagger";

export function SwaggerDecoratorByCreateOrUpdateCart(): MethodDecorator {
    return applyDecorators(
        ApiOperation({ summary: 'Create or add product in cart' }),
        ApiResponse({ status: HttpStatus.NO_CONTENT, description: "No content" }
        ),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST, schema: schemaBadRequestForSwagger
        }),
    );
}

export function SwaggerDecoratorByUpdateProductQuantityInCart(): MethodDecorator {
    return applyDecorators(
        ApiOperation({ summary: 'Update product quantity in cart' }),
        ApiResponse({ status: HttpStatus.NO_CONTENT, description: "No content" }
        ),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST, schema: schemaBadRequestForSwagger
        }),
    )
}