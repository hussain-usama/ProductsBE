import express from 'express'

const router=express.Router()

router.get('/',(req,res)=>{
    // start db operations
    res.send({message:'Response receive successfully!'})
})

router.post('/add',(req,res)=>{
    // start db operations
    res.send({message:'Record added successfully!'})
})

router.put('/update',(req,res)=>{
    // start db operations
    res.send({message:'Record updated successfully!'})
})

router.delete('/delete',(req,res)=>{
    // start db operations
    res.send({message:'Record deleted successfully!'})
})

export default router