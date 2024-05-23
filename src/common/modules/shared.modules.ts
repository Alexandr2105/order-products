import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { categoryProviders } from "../const/categoryProviders";
import { databaseProviders } from "../database/providers";

@Module({
    imports: [CqrsModule],
    providers: [...databaseProviders, ...categoryProviders],
    exports: [CqrsModule, ...databaseProviders, ...categoryProviders]
})

export class SharedModule { }