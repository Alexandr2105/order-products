import { ApiProperty } from "@nestjs/swagger";
import { Validate } from "class-validator";
import { CheckCategoryId } from "src/common/custom.validators/check.category.id";

export class CategoryIdDto {
    @ApiProperty({ type: 'number' })
    @Validate(CheckCategoryId)
    categoryId: number;
}