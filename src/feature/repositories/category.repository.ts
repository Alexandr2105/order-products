import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/feature/tables/category";
import { CategoryViewModel } from "src/common/viewModels/category.view.model";

@Injectable()
export class CategoryRepository {
    constructor(@Inject("CATEGORY_REPOSITORY") private readonly categoryModel: typeof Category) { }

    async createCategory(category: Category): Promise<CategoryViewModel> {
        return category.save();
    }
}