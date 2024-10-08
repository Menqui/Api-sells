import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositories";
import Product from '../typeorm/entities/Products'
import AppError from "@shared/errors/AppError";


interface IRequest{
  id: string;
  name:string;
  price:number;
  description: string 
  quantity:number;
}

class UpdateProductService{
  public async execute({id,name,price,description,quantity}:IRequest) :Promise<Product>{
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    const productExists = await productsRepository.findByName(name); //VERIFICA SE O PRODUTO JÁ EXISTE COM AQUELE NOME NO BANCO


    if(!product){//senão tiver produto
      throw new AppError('Product not found!');
    }
    if(productExists &&  name!= product.name){
      throw new AppError('There is already one product with this name! ')
    }
    product.name = name;
    product.price = price;
    product.description = description;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
