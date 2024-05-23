import { Inject, Injectable } from "@nestjs/common";
import { CategoryViewModel } from "src/common/viewModels/category.view.model";
import { provide } from "src/common/const/categoryProviders";
import { Category } from "../tables/category.table";

@Injectable()
export class CategoryRepository {
    constructor(@Inject(provide.categoryRepository) private readonly categoryModel: typeof Category) { }

    async createCategory(category: Category): Promise<CategoryViewModel> {
        return category.save();
    }
}