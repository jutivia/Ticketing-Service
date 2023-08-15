import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import { currentuserRouter } from './routes/current-user'
import { signoutRouter } from './routes/signout'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { errorhandler } from './middlewares/error-handler'
import {NotFoundError} from './errors'
const app = express()

app.use(json())
app.use(currentuserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.all('*', async()=>{
  throw new NotFoundError
})

app.use(errorhandler)


app.listen(3000, ()=>{
console.log('Listening on port 3000')
})