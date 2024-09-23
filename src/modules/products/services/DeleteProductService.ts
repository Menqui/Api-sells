import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositories";
import Product from '../typeorm/entities/Products'
import AppError from "@shared/errors/AppError";


interface IRequest{
  id: string;
}

class DeleteProductService{
  public async execute({id}:IRequest) :Promise<void>{
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);//pesquisa o produto com o referente id
    

    if(!product){//senão tiver produto
      throw new AppError('Product not found!');
    }
    await productsRepository.remove(product);//deleta o produto

  }
}

export default DeleteProductService;
