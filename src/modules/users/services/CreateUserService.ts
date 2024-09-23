import { User } from '../typeorm/entities/User';
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/usersRepository";
import AppError from "@shared/errors/AppError";


interface Irequest {
  name:string;
  email:string;
  password:string;
}

class CreateUserService{
  public async execute({name,email,password}:Irequest):Promise<User>{
     const userRepository = getCustomRepository(UserRepository);
     const emailExist =await userRepository.findByemail(email);

     if(emailExist){ //verifica se já existe e-mail cadastrado na plataforma
      throw new AppError('There is already an user with this e-mail!');
     }
      const user = userRepository.create({
        name,
        email,
        password,
      });

      console.log(user)
      await userRepository.save(user);

      return user;
  }

}

export default CreateUserService;
