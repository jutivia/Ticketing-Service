import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError} from '../errors';
import { validateRequest } from '../middlewares/validateRequest';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Valid email must be provided'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ], validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({email})
    if(existingUser){
     throw new BadRequestError('Email exists')
    }

    const user = User.buildUser({email, password})
    await user.save()

    // Generate jwt and store on the session object
    const userJwt = user.createToken(user)

    req.session = {
      jwt: userJwt
    }
    res.status(201).send(user)
  }
);

export { router as signupRouter };
