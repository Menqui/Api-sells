import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";

export default class UserController {
  public async index(request:Request, response:Response):Promise<Response>{
      try {
        const listUser = new ListUserService();

        const users = await listUser.execute();
        return response.json(users);
      } catch (error) {
        console.log(error);
        return  response.status(500).json({error:'Internal server error!'});
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
      console.log(user)
      return response.json(user);
     } catch (error) {
         console.log(error);
         return response.status(500).json({error:'Internal server error!'});
     }
  }
}
