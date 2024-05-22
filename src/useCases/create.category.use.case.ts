import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CategoryDto } from "src/dto/category.dto";
import { CategoryRepository } from "src/repositories/category.repository";
import { Category } from "src/tables/category";
import { CategoryViewModel } from "src/common/viewModels/category.view.model";

export class CreateCategoryCommand {
    constructor(public body: CategoryDto) { }
}

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryUseCase implements ICommandHandler<CreateCategoryCommand> {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(command: CreateCategoryCommand): Promise<CategoryViewModel> {
        const newCategory = Category.build({ name: command.body.name, description: command.body.description });

       return this.categoryRepository.createCategory(newCategory);
    }
}