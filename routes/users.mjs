import express from 'express'
import AuthUsers from '../modals/users.mjs'

const router=express.Router()

router.get('/',async(req,res)=>{
    // start db operations
    try {
        const allUsers =await AuthUsers.find()
        res.send({message:'Users fetched successfully!', data:allUsers})
    } catch (error) {
        res.send({message:error.message})
    }
})

router.post('/register',async(req,res)=>{
    // start db operations
   try {
    const {email} =req.body
    const findUser =await AuthUsers.findOne({email})
    if(findUser?.email){
        res.send({message: 'Email already registered!' })
        return
    }
  
     const newUser = await AuthUsers.create(req.body)
     res.send({message:'Registered successfully!' , data: {email: newUser.email, username: newUser.username}})
   } catch (error) {
      res.send({message:error.message})
   }
})


router.post('/login',async(req,res)=>{
    // start db operations
    try {
        const {email, password} =req.body
        const findUser =await AuthUsers.findOne({email})
        if(!findUser){
            res.send({message:'User not found!'})
            return 
        }
        const validateUser = findUser.comparePassword(password)
        if(!validateUser){
            res.send({message:'Incorrect password!'})
            return
        }
        const token = findUser.generateToken()
        res.send({message:'Logged in successfully!', token})
    } catch (error) {
        res.send({message:error.message})
    }
})


export default router