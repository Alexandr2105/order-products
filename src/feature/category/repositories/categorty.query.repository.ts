import { Inject, Injectable } from "@nestjs/common";
import { CategoryViewModel } from "src/common/viewModels/category.view.model";
import { provide } from "src/common/const/categoryProviders";
import { Category } from "../tables/category.table";

@Injectable()
export class CategoryQueryRepository {
    constructor(@Inject(provide.categoryRepository) private readonly categoryModel: typeof Category) { }

    async getAllCategory(): Promise<CategoryViewModel[]> {
        return this.categoryModel.findAll();
    }

    async getCategoryById(categoryId: number): Promise<CategoryViewModel> {
        return this.categoryModel.findOne({ where: { id: categoryId } });
    }
}