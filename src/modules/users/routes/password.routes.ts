import { Router} from 'express';
import { celebrate,Joi,Segments} from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';

const forgotPasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();



//[Segments.PARAMS] === validação para os paramentro recebidos
//[Segments.BODY]   === validação para o corpo da requisição

//----------------------------------- ROTAS ---------------------------------------




//  ROTA DE POST - CREATE
forgotPasswordRouter.post('/forgot',
  celebrate({
    [Segments.BODY]:{  //define os valores para o corpo da requisição
      email:Joi.string().required(),//única informação recebida do usuário
    },
  }),
  forgotPasswordController.create,
);

export default forgotPasswordRouter;
