import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositories";
import Product from '../typeorm/entities/Products'




class ListProductService{
  public async execute() :Promise<Product[]>{
    const productsRepository = getCustomRepository(ProductRepository);
    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
