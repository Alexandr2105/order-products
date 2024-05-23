import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { SwaggerDecoratorByCreateCategory, SwaggerDecoratorByGetAllCategory } from "src/common/swagger/swagger.category.decorators";
import { CategoryViewModel } from "src/common/viewModels/category.view.model";
import { CreateCategoryCommand } from "src/feature/category/application/use-cases/create.category.use.case";
import { CategoryDto } from "src/feature/category/dto/category.dto";
import { CategoryService } from "./application/services/category.service";

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly commandBus: CommandBus, private readonly categoryService: CategoryService) { }

    @Get()
    @SwaggerDecoratorByGetAllCategory()
    async getAllCategory(): Promise<CategoryViewModel[]> {
        return this.categoryService.getAllCategory();
    }

    @Post()
    @SwaggerDecoratorByCreateCategory()
    async createCategory(@Body() body: CategoryDto): Promise<CategoryViewModel> {
        return await this.commandBus.execute(new CreateCategoryCommand(body));
    }
}