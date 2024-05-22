import { Inject, Injectable } from "@nestjs/common";
import { where } from "sequelize";
import { User } from "src/feature/tables/user";

@Injectable()
export class UserQueryRepository {
    constructor(@Inject('USER_REPOSITORY') private readonly productModel: typeof User) {
    }

    async getUserById(userId: number) {
        return this.productModel.findOne({ where: { id: userId } });
    }
}