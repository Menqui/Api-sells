import { User } from '../typeorm/entities/User';
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/usersRepository";
import AppError from "@shared/errors/AppError";
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';


interface Irequest {
  email:string;
  password:string;
}

interface Iresponse {
  user : User;
  token : string;
}


class CreateSessionsService{
  public async execute({email,password}:Irequest):Promise<Iresponse>{
     const userRepository = getCustomRepository(UserRepository);
     const user =await userRepository.findByEmail(email);

     if(!user){ //verifica se já existe e-mail cadastrado na plataforma
      throw new AppError('Incorrect e-mail/password!', 401 );//informa o status code junto
     }
     const passwordConfirmed = await compare(password,user.password);// compara a senha criptografada do user para ver se é compativel com a senha original

     if(!passwordConfirmed){ //se a senha não for compativel
      throw new AppError('Incorrect e-mail/password');
     }
     const token = sign({},authConfig.jwt.secret,{
      subject:user.id,
      expiresIn:authConfig.jwt.expiresIn,
     });

     await userRepository.save(user);

     return {
      user,
      token
     };
  }

}

export default CreateSessionsService;
