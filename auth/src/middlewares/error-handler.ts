import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/CustomError"
export const errorhandler = (err:Error, req:Request, res:Response, next:NextFunction) => {

  if(err instanceof CustomError) {
   return  res.status(err.code).send({
      success: false,
      errors: err.formatError()
    })
  }
  res.status(400).send({
    success: false,
    message: 'Something went wrong'
  })
}