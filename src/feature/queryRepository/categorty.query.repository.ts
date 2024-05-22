import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/feature/tables/category";
import { CategoryViewModel } from "src/common/viewModels/category.view.model";

@Injectable()
export class CategoryQueryRepository {
    constructor(@Inject('CATEGORY_REPOSITORY') private readonly categoryModel: typeof Category) { }

    async getAllCategory(): Promise<CategoryViewModel[]> {
        return this.categoryModel.findAll();
    }

    async getCategoryById(categoryId: number): Promise<CategoryViewModel> {
        return this.categoryModel.findOne({ where: { id: categoryId } });
    }
}