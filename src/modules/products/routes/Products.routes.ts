import {  Router  } from 'express';
import ProductController from '../Controllers/ProductsController';
import { celebrate , Joi , Segments } from 'celebrate'  //Biblioteca para fazer validações

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get('/',productController.index);


//[Segments.PARAMS] === validação para os paramentro recebidos
//[Segments.BODY]   === validação para o corpo da requisição

//----------------------------------- ROTAS ---------------------------------------

productsRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]:{
      id:Joi.string().uuid().required(), //id tem que ser uma string uuid
    },
  }),
  productController.show);

productsRouter.post('/',
  celebrate({
    [Segments.BODY]:{
      name: Joi.string().required(),
      price:Joi.number().precision(2).required(),
      quantity:Joi.number().required(),

    }
  }),
  productController.create);

productsRouter.put('/:id',
  celebrate({
    [Segments.PARAMS]:{
       id:Joi.string().uuid().required(),
    },
    [Segments.BODY]:{
      name:Joi.string().required(),
      price:Joi.number().precision(2).required(),
      quantity:Joi.number().required(),
    }
  }),
  productController.update);

productsRouter.delete('/:id',celebrate({
  [Segments.PARAMS]:{
    id:Joi.string().uuid().required(),
  }
}),productController.delete);



export default productsRouter;
