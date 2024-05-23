import { Module } from "@nestjs/common";
import { CheckUserId } from "src/common/custom.validators/check.user.id";
import { UserQueryRepository } from "./repositories/users.query.repository";
import { SharedModule } from "src/common/modules/shared.modules";

@Module({
    imports: [SharedModule],
    controllers: [],
    providers: [UserQueryRepository, CheckUserId],
    exports: [CheckUserId]
})

export class UserModule { }