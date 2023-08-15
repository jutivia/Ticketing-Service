
import { CustomError } from "./CustomError";
export class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to the database';
  code = 500;
  formatError() {
    return [{ message: this.reason }];
  }
  constructor() {
    super('Error connecting to db');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
