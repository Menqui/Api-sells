import AppError from "@shared/errors/AppError";
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import authConfig from '@config/auth';

interface TokenPayload{
  iat:number,
  exp:number,
  sub:string,
}
export default function isAuthenticated(
  request:Request,response:Response,next:NextFunction,
):void{
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw  new AppError('JWT is missing!');
  }
  const [,token] = authHeader.split(' ');

  try{
    const decodedToken = verify(token,authConfig.jwt.secret);

    const {sub} = decodedToken as TokenPayload;
    request.user = {
      id:sub,
    }

    return next();//
  }catch{
   throw new AppError('Invalid JWT token!');
  }
}
