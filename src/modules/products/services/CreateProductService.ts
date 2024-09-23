import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositories";
import Product from '../typeorm/entities/Products'
import AppError from "@shared/errors/AppError";

interface IRequest{
  name:string,
  price:number,
  quantity:number,
}

class CreateProductService{
  public async execute({name,price,quantity}:IRequest):Promise<Product>{
     const productsRepository = getCustomRepository(ProductRepository);
     const productExists = await productsRepository.findByName(name); //VERIFICA SE O PRODUTO JÁ EXISTE COM AQUELE NOME NO BANCO

     if(productExists){//se existe um produto com uim nome já cadastrado
       throw new AppError('There is already a product with this name');
     }
     const product = productsRepository.create({
      name,
      price,
      quantity,
     });
     await productsRepository.save(product);

     return product;
  }
}

export default CreateProductService;
