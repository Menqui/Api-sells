import { EntityRepository, Repository } from "typeorm";
import User from '../entities/User';

@EntityRepository(User)

class UserRepository extends Repository<User>{
  public async findByname(name:string):Promise<User | undefined>{ //método para achar usuário por nome
    const user  = await this.findOne({
      where:
      name,
    });
    return user;
  }

  public async findByid(id:string):Promise<User | undefined>{ //método para achar um usuário por id
    const user = await this.findOne({
      where:
      id,
    });
    return user;
  }

  public async findByemail(email:string):Promise<User | undefined >{//método para achar um usuário pelo email
     const user = await this.findOne({
      where:
      email,
     });
     return user;
  }
}


export default UserRepository;
