class AppError{
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message:string, statusCode  = 400){
    this.message = message;
    this.statusCode = statusCode; //se não tiver nenhum erro devolve o padrão que é 400
  }
}


export default AppError;
