import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Length } from "class-validator";

export class CategoryDto {
    @ApiProperty({ type: "string", description: "Category name", minimum: 3, maximum: 30 })
    @Transform(({ value }) => value.trim())
    @Length(3, 30)
    name: string;

    @ApiProperty({ type: "string", description: "Category description", minimum: 10, maximum: 500 })
    @Transform(({ value }) => value.trim())
    @Length(10, 500)
    description: string;
}