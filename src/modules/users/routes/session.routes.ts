import { Router} from 'express';
import { celebrate,Joi,Segments} from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sessionRouter = Router();
const sessionController = new SessionsController();



//[Segments.PARAMS] === validação para os paramentro recebidos
//[Segments.BODY]   === validação para o corpo da requisição

//----------------------------------- ROTAS ---------------------------------------

//  ROTA DE GET - LIST


//  ROTA DE POST - CREATE
sessionRouter.post('/',
  celebrate({
    [Segments.BODY]:{  //define os valores para o corpo da requisição
      email:Joi.string().required(),
      password:Joi.string().required()
    },
  }),
  sessionController.createSession,
);

export default sessionRouter;
