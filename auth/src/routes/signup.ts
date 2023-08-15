import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestvalidationError } from '../errors';
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Valid email must be provided'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
     const errors = validationResult(req)
     if(!errors.isEmpty()){
      throw new RequestvalidationError(errors.array())
     }
    const { email, password } = req.body

    res.send({data: {email, password}});
  }
);

export { router as signupRouter };
