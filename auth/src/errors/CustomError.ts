export abstract class CustomError extends Error{
  abstract code: number;
  abstract formatError(): {
    message: string;
    field?: string
  }[]

  constructor (err: string){
    super(err)
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}