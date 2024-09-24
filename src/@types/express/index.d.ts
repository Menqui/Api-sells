//-------------------------------------------------------------------------------------------------------------
//ESTE ARQUIVO SÓ EXISTE PARA REALIZAR UMA SOBRESCRITA NA BIBLIOTECA EXPRESS PARA FACILITAR A MANIPULAÇÃO DO TOKEN EM ISAUTHETICATED
//-------------------------------------------------------------------------------------------------------------

declare namespace Express{
  export interface Request{
    user:{
      id:string;
    }
  }
}
