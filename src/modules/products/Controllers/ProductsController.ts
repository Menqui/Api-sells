import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default  class ProductController{
  public async index(request: Request, response:  Response):Promise<Response>{ //metodo para listagem dos produtos
     try {
      const listProducts = new ListProductService();

      const products = await listProducts.execute();

        return response.json(products);
     } catch (error) {
        console.log(error);
        return response.status(500).json({error:'Internal server error!'});
     }
  }
  public async show(request: Request, response:  Response):Promise<Response>{ //metodo para exibir um unico produto escolhido
      try {
        const { id } = request.params;
        const showProduct = new ShowProductService();

        const product = await showProduct.execute({id});

        return response.json(product)
      } catch (error) {
        console.log(error);
        return response.status(500).json({error:'Internal server error!'});
      }
  }
  public async create(request: Request, response:  Response):Promise<Response>{//metodo para criar um produto
    try {
      const {name,price,quantity} = request.body;
      const createProduct = new CreateProductService();

      const product = await createProduct.execute({
       name,
       price,
       quantity
     });

     return response.json(product)
    } catch (error) {
       console.log(error);
       return response.status(500).json({error:'Internal server error!'});
    }
  }
  public async update(request:Request,response:Response):Promise<Response>{//metodo para atualizar um produto
    try {
      const {id} = request.params;
      const {name,price,quantity} = request.body;

      const updateProduct = new UpdateProductService();

      const product = await updateProduct.execute({
        id,
        name,
        price,
        quantity,
      });

       return response.json(product);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public async delete(request:Request , response:Response):Promise<Response>{ //metodo para deletar um produto
     try {
      const {id} = request.params;
      const deleteProduct = new DeleteProductService();

      await deleteProduct.execute({id});

      return response.json('Produto deletado com sucesso!');
     } catch (error) {
        console.log(error);
        return response.status(500).json({error:'Internal server error!'});
     }
  }
}
