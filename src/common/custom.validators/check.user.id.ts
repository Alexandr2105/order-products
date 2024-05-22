import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserQueryRepository } from "src/feature/queryRepository/users.query.repository";

@ValidatorConstraint()
@Injectable()
export class CheckUserId implements ValidatorConstraintInterface {
    constructor(private readonly userQueryrRepository: UserQueryRepository) { }

    async validate(userId: number) {       
        const user = await this.userQueryrRepository.getUserById(userId);
        
        return !!user;
    }

    defaultMessage(): string {
        return 'Такого пользователя не существует';
    }
}