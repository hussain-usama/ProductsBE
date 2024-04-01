import express from 'express'
import Products from '../modals/products.mjs'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        // start db operations
        const getProducts = await Products.find()
        res.send({ message: 'Products Fetched Successfully!', data: getProducts })
    } catch (error) {
        res.send({ message: error.message })
    }
})

router.post('/add', async (req, res) => {
    try {
        // start db operations
        await Products.create(req.body)
        res.send({ message: 'Product added successfully!' })
    } catch (error) {
        res.send({ message: error.message })
    }
})

router.put('/update', async (req, res) => {
    // start db operations
    try {
        const { _id, title, amount, description } = req.body;
        let updatedProduct= await Products.findOneAndUpdate(
            { _id },
            { $set: { title, amount, description } },
            { new: true }
        );
        res.send({ message: 'Record updated successfully!',data: updatedProduct });
    } catch (error) {
        res.send({ message: error.message })
    }
})

router.delete('/delete/:_id', async(req, res) => {
    // start db operations
    try {
        const { _id } = req.params;
        let deletedRecord = await Products.findOneAndDelete( { _id } );
        if(!deletedRecord){
            res.send({ message: 'Record not found!' })
            return
        }
        res.send({ message: 'Record deleted successfully!' })
    } catch (error) {
        res.send({ message: 'Record not deleted!' })
    }
})

export default router