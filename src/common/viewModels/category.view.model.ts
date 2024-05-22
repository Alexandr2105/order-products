import { ApiProperty } from "@nestjs/swagger";

export class CategoryViewModel {
    @ApiProperty({ type: 'number' })
    id?: number;
    @ApiProperty({ type: 'string', description: 'User name' })
    name: string;
    @ApiProperty({ type: 'string', description: 'Category description' })
    description: string;
    @ApiProperty({ type: 'string', format: 'date-time', description: 'Date of update' })
    updatedAt?: string;
    @ApiProperty({ type: 'string', format: 'date-time', description: 'Date of creation', })
    createdAt?: string;
}