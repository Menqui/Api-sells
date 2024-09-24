import { Request, Response } from "express";
import AppError from "@shared/errors/AppError";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {
  public async update(request:Request,response:Response){
     try {
      const { filename } = request.file || {}; //garante que filename não é nulo

      if (!filename) {
        throw new AppError("Avatar file is required.", 400);
      }

      const updateAvatar = new UpdateUserAvatarService();
      const user = updateAvatar.execute({
        user_id:request.user.id,
        avatarFileName:filename
      });
      return response.json(user);

     } catch (error) {
         console.log(error);
         return response.status(400).json(error)
     }
  }
}
