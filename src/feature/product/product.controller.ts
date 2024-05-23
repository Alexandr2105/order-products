import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { SwaggerDecoratorByCreateProduct, SwaggerDecoratorByGetAllProducts } from "src/common/swagger/swagger.product.decorators";
import { ProductViewModel } from "src/common/viewModels/product.view.model";
import { CategoryIdDto } from "src/feature/category/dto/category.id.dto";
import { ProductDto } from "src/feature/product/dto/product.dto";
import { ProductService } from "./application/services/product.service";
import { CreateProductCommand } from "./application/use-cases/create.product.use.case";

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly commandBus: CommandBus, private readonly productService: ProductService) { }

    @Get(':categoryId')
    @SwaggerDecoratorByGetAllProducts()
    async getAllProductsForCategory(@Param() param: CategoryIdDto): Promise<ProductViewModel[]> {
        return this.productService.getAllProductsForCategory(param.categoryId);
    }

    @Post(':categoryId')
    @SwaggerDecoratorByCreateProduct()
    async createProduct(@Body() body: ProductDto, @Param() param: CategoryIdDto): Promise<ProductViewModel> {
        return await this.commandBus.execute(new CreateProductCommand(body, param.categoryId));
    }
}