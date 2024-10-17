import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/usersRepository";
import AppError from "@shared/errors/AppError";
import UserTokenRepository from '../typeorm/repositories/userTokenRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const userTokenRepository = getCustomRepository(UserTokenRepository);

      const user = await userRepository.findByEmail(email); // Verifica se o e-mail existe

      if (!user) { // Se não encontrar nenhum usuário com este e-mail
        throw new AppError("User doesn't exist!");
      }
      console.log(user)
      const token = await userTokenRepository.generate(user.id); // Cria o token depois de receber o id do user
      console.log(token);
    } catch (error) {
      console.log(error);
      throw new AppError("An unexpected error occurred");
    }
  }
}

export default SendForgotPasswordEmailService;
