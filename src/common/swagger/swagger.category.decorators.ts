import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { schemaBadRequestForSwagger } from "src/common/types/schema.bad.request.for.swagger";
import { CategoryViewModel } from "src/common/viewModels/category.view.model";

export function SwaggerDecoratorByGetAllCategory(): MethodDecorator {
    return applyDecorators(
        ApiOperation({ summary: 'Get all categories' }),
        ApiResponse({ status: HttpStatus.OK, type: [CategoryViewModel] }
        ),
    );
}

export function SwaggerDecoratorByCreateCategory(): MethodDecorator {
    return applyDecorators(
        ApiOperation({ summary: 'Create category' }),
        ApiResponse({ status: HttpStatus.CREATED, type: CategoryViewModel }
        ),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST, schema: schemaBadRequestForSwagger
        }),
    )
}