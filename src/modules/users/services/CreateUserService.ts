import { User } from '../typeorm/entities/User';
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/usersRepository";
import AppError from "@shared/errors/AppError";
import { hash } from 'bcryptjs';


interface Irequest {
  name:string;
  email:string;
  password:string;
}

class CreateUserService{
  public async execute({name,email,password}:Irequest):Promise<User>{
     const userRepository = getCustomRepository(UserRepository);
     const emailExist =await userRepository.findByEmail(email);

     if(emailExist){ //verifica se já existe e-mail cadastrado na plataforma
      throw new AppError('There is already an user with this e-mail!');
     }
     const hashedPassword = await hash(password,8);//criptografa a senha do usuário

     const user = userRepository.create({
        name,
        email,
        password : hashedPassword,
      });

      console.log(user)
      await userRepository.save(user);

      return user;
  }

}

export default CreateUserService;
