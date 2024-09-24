import { Router} from 'express';
import { celebrate,Joi,Segments} from 'celebrate';
import UserController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const userController = new UserController();



//[Segments.PARAMS] === validação para os paramentro recebidos
//[Segments.BODY]   === validação para o corpo da requisição

//----------------------------------- ROTAS ---------------------------------------

//  ROTA DE LIST
usersRouter.get('/',isAuthenticated,userController.index);

//  ROTA DE GET - CREATE
usersRouter.post('/',
  celebrate({
    [Segments.BODY]:{  //define os valores para o corpo da requisição
      name:Joi.string().required(),
      email:Joi.string().required(),
      password:Joi.string().required()
    },
  }),
  userController.create,
);

export default usersRouter;
