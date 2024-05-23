import { Module } from "@nestjs/common";
import { CheckCategoryId } from "src/common/custom.validators/check.category.id";
import { SharedModule } from "src/common/modules/shared.modules";
import { CreateCategoryUseCase } from "./application/use-cases/create.category.use.case";
import { CategoryController } from "./category.controller";
import { CategoryQueryRepository } from "./repositories/categorty.query.repository";
import { CategoryRepository } from "./repositories/category.repository";
import { CategoryService } from "./application/services/category.service";

@Module({
    imports: [SharedModule],
    controllers: [CategoryController],
    providers: [CategoryQueryRepository, CategoryRepository, CreateCategoryUseCase, CheckCategoryId, CategoryService],
    exports: []
})

export class CategoryModule { }