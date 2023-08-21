import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { DatabaseConnectionError } from './errors';
import { currentuserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorhandler } from './middlewares/error-handler';
import { NotFoundError } from './errors';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)
app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorhandler);

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('Jwt key must be defined')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  
    console.log('Connected to mongodb')
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError()
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!!')
  });
 
};

start()