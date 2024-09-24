import { EntityRepository, Repository } from "typeorm";
import User from '../entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {

  public async findByName(name: string): Promise<User | undefined> {
    // método para achar usuário por nome
    const user = await this.findOne({
      where: { name }, // mapeia a coluna 'name' ao valor
    });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    // método para achar um usuário por id
    const user = await this.findOne({
      where: { id }, // mapeia a coluna 'id' ao valor
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    // método para achar um usuário pelo email
    const user = await this.findOne({
      where: { email }, // mapeia a coluna 'email' ao valor
    });
    return user;
  }
}

export default UserRepository;
