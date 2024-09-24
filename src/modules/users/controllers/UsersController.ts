import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import AppError from "@shared/errors/AppError";

export default class UserController {
  public async index(request:Request, response:Response):Promise<Response>{
      try {
        const listUser = new ListUserService();

        const users = await listUser.execute();
        return response.json(users);
      } catch (error) {
        console.log(error);
        return response.status(500)
      }
  }

  public async create(request:Request,response:Response){
     try {
      const {name,email,password} = request.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({
        name,
        email,
        password,
      });
      
      return response.json(user);
     } catch (error) {
         console.log(error);
         return response.status(400).json(error)
     }
  }
}
