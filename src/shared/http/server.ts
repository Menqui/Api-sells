import express,{NextFunction, Request,Response} from "express";
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import routes from './routes';
import AppError from "@shared/errors/AppError";
import '@shared/typeorm';
import { errors } from 'celebrate'
import uploadConfig from "@config/upload";

const app = express();

app.use(cors());
app.use(express.json());//interpreta o Json
app.use('/files',express.static(uploadConfig.directory));//resgata o conteudo que está no diretorio upload
app.use(routes);
app.use(errors());//pega o erro gerado pelo celebrate e trata
app.use((error:Error ,request:  Request ,response: Response, next:NextFunction)=>{ //middleware de error
   if(error instanceof AppError){
    return response.status(error.statusCode).json({ //se o erro é uma instância da nossa classe
      status:'error',
      message: error.message,
    });
   }
   return response.status(500).json({ //senão
    status:'error',
    message:'Internal server Error!',
   })
})

var port = 3333;
app.listen(port,()=>{
  console.log(`Server started on port ${port}`)
});
