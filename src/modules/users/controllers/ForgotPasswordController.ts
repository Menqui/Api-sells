import { Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {
  public async create(request:Request,response:Response):Promise<Response>{
     try {
      const {email} = request.body;

      const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

      await sendForgotPasswordEmail.execute({
        email,
      });

      return response.status(204).json(); // não tem nada pra ser retornado , porém deu tudo certo!
     } catch (error) {
         console.log(error);
         return response.status(400).json(error)
     }
  }
}
