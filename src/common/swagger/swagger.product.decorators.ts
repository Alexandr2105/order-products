import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { schemaBadRequestForSwagger } from "src/common/types/schema.bad.request.for.swagger";
import { ProductViewModel } from "src/common/viewModels/product.view.model";

export function SwaggerDecoratorByGetAllProducts(): MethodDecorator {
    return applyDecorators(
        ApiOperation({ summary: 'Get all products by categoryId' }),
        ApiResponse({ status: HttpStatus.OK, type: [ProductViewModel] }
        ),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST, schema: schemaBadRequestForSwagger
        }),
    );
}

export function SwaggerDecoratorByCreateProduct(): MethodDecorator {
    return applyDecorators(
        ApiOperation({ summary: 'Create product' }),
        ApiResponse({ status: HttpStatus.CREATED, type: ProductViewModel }
        ),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST, schema: schemaBadRequestForSwagger
        }),
    )
}