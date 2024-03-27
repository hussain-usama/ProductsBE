import express from 'express'
import Products from '../modals/products.mjs'

const router=express.Router()

router.get('/',async(req,res)=>{
    // start db operations
    const getProducts = await Products.find()
    res.send({message:'Products Fetched Successfully!',data:getProducts})
})

router.post('/add',async(req,res)=>{
    // start db operations
    try {
        await Products.create(req.body)
        res.send({ message: 'Product added successfully!' })
    } catch (error) {
        res.send({ message: error.message })
    }
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