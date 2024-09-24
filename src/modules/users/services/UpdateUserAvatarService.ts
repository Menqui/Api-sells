import { User } from '../typeorm/entities/User';
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/usersRepository";
import AppError from '@shared/errors/AppError';
import path from 'path';
import uploadConfig from '@config/upload';
import  fs  from 'fs';



interface Irequest {
  avatarFileName:string,
  user_id:string
}

class UpdateUserAvatarService{
  public async execute({avatarFileName,user_id}:Irequest):Promise<User>{
     const userRepository = getCustomRepository(UserRepository);

     const user = await userRepository.findById(user_id); //procura o user pelo id

     if(!user){
      throw new AppError('User not found!');
     }
     if(user.avatar){
      const userAvatarFilePath = path.join(uploadConfig.directory,user.avatar);
      const userAvatarFileExists  = await fs.promises.stat(userAvatarFilePath); //fs é uma biblioteca que manipula o sistema de arquivos

      if(userAvatarFileExists){//remove arquivos desnecessários do servidor
        await fs.promises.unlink(userAvatarFilePath);
      }
      //cadastrar o novo avatar do user
      user.avatar = avatarFileName;
      await userRepository.save(user);
     }
     return user
  }
}

export default UpdateUserAvatarService;
