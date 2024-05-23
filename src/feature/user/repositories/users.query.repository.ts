import { Inject, Injectable } from "@nestjs/common";
import { where } from "sequelize";
import { provide } from "src/common/const/categoryProviders";
import { User } from "../tables/user.table";

@Injectable()
export class UserQueryRepository {
    constructor(@Inject(provide.userRepository) private readonly productModel: typeof User) {
    }

    async getUserById(userId: number) {
        return this.productModel.findOne({ where: { id: userId } });
    }
}