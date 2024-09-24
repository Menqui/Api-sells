import { User } from '../typeorm/entities/User';
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/usersRepository";
import AppError from "@shared/errors/AppError";
import { compare, hash } from 'bcryptjs';


interface Irequest {
  email:string;
  password:string;
}

/*interface Iresponse {
  user : User;
//token :
}
*/

class CreateSessionsService{
  public async execute({email,password}:Irequest):Promise<Irequest>{
     const userRepository = getCustomRepository(UserRepository);
     const user =await userRepository.findByEmail(email);

     if(!user){ //verifica se já existe e-mail cadastrado na plataforma
      throw new AppError('Incorrect e-mail/password!', 401 );//informa o status code junto
     }
     const passwordConfirmed = await compare(password,user.password);// compara a senha criptografada do user para ver se é compativel com a senha original

     if(!passwordConfirmed){ //se a senha não for compativel
      throw new AppError('Incorrect e-mail/password');
     }

     await userRepository.save(user);

     return user;
  }

}

export default CreateSessionsService;
