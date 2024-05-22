import { Injectable, NotFoundException } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { CategoryQueryRepository } from "src/queryRepository/categorty.query.repository";

@ValidatorConstraint()
@Injectable()
export class CheckCategoryId implements ValidatorConstraintInterface {
    constructor(private readonly category: CategoryQueryRepository) { }

    async validate(categoryId: number) {        
        const category = await this.category.getCategoryById(categoryId);
        return !!category;
    }

    defaultMessage(): string {
        return 'Такая категория не существует';
      }
}