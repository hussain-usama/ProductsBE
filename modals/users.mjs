import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtSecret from "../config/jwt.mjs";

const {Schema} = mongoose

const usersSchema=new Schema({
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String,
        minLength:6
    },
    username:{
        required:true,
        type:String
    }
},{
    versionKey:false
})

/* Password Encryption on register*/
usersSchema.pre('save',function(next){
    const user = this
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash
    next()
})

/* compare password on login */
usersSchema.methods.comparePassword = function(password){ 
    const user = this
    return bcrypt.compareSync(password, user.password)
}

/* Generate Token on Login*/
usersSchema.methods.generateToken = function(){
    const user = this
    const token = jwt.sign({ _id: user?._id }, jwtSecret);
    return token;
}
const AuthUsers=mongoose.model('users',usersSchema)

export default AuthUsers