import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProductDto } from "src/dto/product.dto";
import { ProductRepository } from "src/repositories/product.repository";
import { Product } from "src/tables/product";
import { ProductViewModel } from "src/common/viewModels/product.view.model";

export class CreateProductCommand {
    constructor(public body: ProductDto, public productId: number) { }
}

@CommandHandler(CreateProductCommand)
export class CreateProductUseCase implements ICommandHandler<CreateProductCommand> {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(command: CreateProductCommand): Promise<ProductViewModel> {
        const newProduct = Product.build({ name: command.body.name, description: command.body.description, price: command.body.price, quantity: command.body.quantity, categoryId: command.productId });

        return this.productRepository.createProduct(newProduct);
    }
}