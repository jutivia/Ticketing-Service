import mongoose from "mongoose";
import { Password } from "../services/password";
import jwt  from "jsonwebtoken";
// An interface that describes the properties required to create a new user
interface UserAttr{
  email: string;
  password: string
}

// An interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc>{
  buildUser(attrs: UserAttr): UserDoc,
}

// An interface that describes what the properties of a user Document has
interface UserDoc extends mongoose.Document{
  email: string,
  password: string,
  createToken(user:UserDoc):string
}

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
}, {
  toJSON:{
    transform(doc, ret){
      ret.id = ret._id
      delete ret._id
      delete ret.password
      delete ret.__v
    }
  }
})
userSchema.statics.buildUser=(attrs: UserAttr) =>{
  return new User(attrs)
}
userSchema.methods.createToken=(user: UserDoc): string=>{
 
  const token = jwt.sign({
    id: user._id,
    email: user.email
  }, process.env.JWT_KEY!)
  return token
}

userSchema.pre('save', async function (done){
  if(this.isModified('password')){
    const hashed = await Password.tohash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})
const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export {User}