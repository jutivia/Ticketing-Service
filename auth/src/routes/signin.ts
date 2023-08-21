import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';
import { Password } from '../services/password';
import { User } from '../models/user';
import { BadRequestError } from '../errors';
const router = express.Router()

router.post('/api/users/signin',
[
  body('email').isEmail().withMessage('Valid email must be provided'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password must be provided'),
], validateRequest,
 async (req:Request,res:Response)=>{
  const {email, password} = req.body
  const user = await User.findOne({email})
  if(!user) throw new BadRequestError('Invalid credentials')
  const compare = await Password.compare(user.password, password)
  if(!compare) throw new BadRequestError('Invalid credentials')
   
  const userJwt = user.createToken(user)

    req.session = {
      jwt: userJwt
    }
  res.status(201).send(user)
})

export {router as signinRouter}