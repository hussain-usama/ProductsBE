import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

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
const AuthUsers=mongoose.model('users',usersSchema)

export default AuthUsers