import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";


@EntityRepository(UserToken)
class UserTokenRepository extends Repository<UserToken> {

  public async findByToken(token: string): Promise<UserToken | undefined> {// método para achar usuário pelo token
    const userToken = await this.findOne({
      where: { token }, // mapeia a coluna token ao valor
    });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken | undefined> { //método para gerar token
    const userToken = await this.create({
      user_id,
    });
   
    await this.save(userToken);
    return userToken;
  }

  public async findByEmail(email: string): Promise<UserToken | undefined> {
    // método para achar um usuário pelo email
    const user = await this.findOne({
      where: { email }, // mapeia a coluna 'email' ao valor
    });
    return user;
  }
}

export default UserTokenRepository;
