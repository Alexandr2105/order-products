import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { CategoryDto } from "src/feature/dto/category.dto";
import { CategoryQueryRepository } from "src/feature/queryRepository/categorty.query.repository";
import { SwaggerDecoratorByCreateCategory, SwaggerDecoratorByGetAllCategory } from "src/common/swagger/swagger.category.decorators";
import { CreateCategoryCommand } from "src/feature/useCases/create.category.use.case";
import { CategoryViewModel } from "src/common/viewModels/category.view.model";

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryQueryRepository: CategoryQueryRepository, private readonly commandBus: CommandBus) { }

    @Get()
    @SwaggerDecoratorByGetAllCategory()
    async getAllCategory(): Promise<CategoryViewModel[]> {
        return this.categoryQueryRepository.getAllCategory();
    }

    @Post()
    @SwaggerDecoratorByCreateCategory()
    async createCategory(@Body() body: CategoryDto): Promise<CategoryViewModel> {
        return await this.commandBus.execute(new CreateCategoryCommand(body));
    }
}