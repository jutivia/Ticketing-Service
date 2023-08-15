import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError{
  code = 404
  constructor(){
    super('Route not found')

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  formatError(){
    return [{message: 'Not Found'}]
  }
}