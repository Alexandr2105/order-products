import { ApiProperty } from "@nestjs/swagger";
import { Validate } from "class-validator";
import { CheckUserId } from "src/custom.validators/check.user.id";

export class UserIdDto {
    @ApiProperty({type:'number'})
    @Validate(CheckUserId)
    userId: number;
}