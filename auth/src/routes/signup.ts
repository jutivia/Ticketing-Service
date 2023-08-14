import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be provided'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
     const errors = validationResult(req)
     if(!errors.isEmpty()){
      return res.status(400).send({success: false, error: errors.array()})
     }
    const { email, password } = req.body

    res.send({data: {email, password}});
  }
);

export { router as signupRouter };
