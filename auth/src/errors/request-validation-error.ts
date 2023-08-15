
import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";
export class RequestvalidationError extends CustomError {
  code = 400
  reason = ''
  formatError(){
    return this.errors.map((error) => {
      if(error.type === 'field'){
        return {message: error.msg, field: error.path}
      }
      return { message: error.msg}
    });
  }

  constructor(public errors: ValidationError[]){
    super('Validation errors');
    Object.setPrototypeOf(this, RequestvalidationError.prototype)
  }
}

