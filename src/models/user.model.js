import { Schema, model } from 'mongoose';
//si ponemos unique se hace sola la validaciòn
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user', enum: ["user","admin"] },
})

export const userModel = model('users', userSchema)