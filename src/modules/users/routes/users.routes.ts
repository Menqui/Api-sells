import { Router} from 'express';
import { celebrate,Joi,Segments} from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();
const userController = new UserController();
const usersAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);


//[Segments.PARAMS] === validação para os paramentro recebidos
//[Segments.BODY]   === validação para o corpo da requisição

//----------------------------------- ROTAS ---------------------------------------

//  ROTA DE GET - LIST
usersRouter.get('/',isAuthenticated,userController.index);

//  ROTA DE POST - CREATE
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

//ROTA DE PATCH - UPDATE AVATAR
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
)

export default usersRouter;
