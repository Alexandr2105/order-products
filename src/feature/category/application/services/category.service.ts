import { Injectable } from "@nestjs/common";
import { CategoryQueryRepository } from "../../repositories/categorty.query.repository";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryQueryRepository: CategoryQueryRepository) { }

    async getAllCategory() {
        return this.categoryQueryRepository.getAllCategory();
    }
}