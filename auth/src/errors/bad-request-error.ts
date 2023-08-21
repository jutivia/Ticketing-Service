
import { CustomError } from "./CustomError";
export class BadRequestError extends CustomError {
  code = 400;
  formatError() {
    return [{ message: this.reason }];
  }
  constructor(public reason: string) {
    super(reason);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
