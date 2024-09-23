import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/usersRepository';


class ListUserService{
  public async execute():Promise<User[]>{
    const userRepository = getCustomRepository(UserRepository);
    const users =  userRepository.find();

    return users;
  }
}

export default ListUserService;
