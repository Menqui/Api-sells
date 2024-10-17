import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/usersRepository";
import {isAfter,addHours} from 'date-fns';
import AppError from "@shared/errors/AppError";
import UserTokenRepository from '../typeorm/repositories/userTokenRepository';
import { hash } from "bcryptjs";


interface Irequest {
  token:string;
  password:string;
}

class ResetPasswordService{
  public async execute({token,password}:Irequest):Promise<void>{
     const userRepository = getCustomRepository(UserRepository);
     const userTokenRepository = getCustomRepository(UserTokenRepository);

     const userToken = await userTokenRepository.findByToken(token);//procura atraves do token o user

     if(!userToken){ //se não encontrar nenhum usuário com este token
       throw new AppError("User Token does not exists!");
     }
      const user = await userRepository.findById(userToken.user_id);
     if(!user){
        throw new AppError("User do not exist!");
      }
     const tokenCreatedAt = userToken.created_at;
     const compareDate = addHours(tokenCreatedAt,2);//pega a data de criação + 2 horas que é o tempo que o token expira

     if(isAfter(Date.now(),compareDate)){//se is After tiver uma data/horario maior que compareDate o prazo já passou então
        throw new AppError("Token expired!")
     }
     user.password = await hash(password,8); //criptografa a nova senha
  }

}

export default ResetPasswordService;
