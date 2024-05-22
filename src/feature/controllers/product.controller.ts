import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { CategoryIdDto } from "src/feature/dto/category.id.dto";
import { ProductDto } from "src/feature/dto/product.dto";
import { ProductQueryRepository } from "src/feature/queryRepository/product.query.repository";
import { SwaggerDecoratorByCreateProduct, SwaggerDecoratorByGetAllProducts } from "src/common/swagger/swagger.product.decorators";
import { CreateProductCommand } from "src/feature/useCases/create.product.use.case";
import { ProductViewModel } from "src/common/viewModels/product.view.model";

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly commandBus: CommandBus, private readonly productQueryRepository:ProductQueryRepository) { }

    @Get(':categoryId')
    @SwaggerDecoratorByGetAllProducts()
    async getAllProductsForCategory(@Param() param: CategoryIdDto):Promise<ProductViewModel[]> {
        return this.productQueryRepository.getAllProductsByCategoryId(param.categoryId);
     }

    @Post(':categoryId')
    @SwaggerDecoratorByCreateProduct()
    async createProduct(@Body() body: ProductDto, @Param() param: CategoryIdDto): Promise<ProductViewModel> {       
        return await this.commandBus.execute(new CreateProductCommand(body, param.categoryId));
    }
}