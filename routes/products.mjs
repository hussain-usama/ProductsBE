import express from 'express'
import Products from '../modals/products.mjs'
import verifyToken from '../middlewares/verifyToken.mjs'

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

router.post('/add',verifyToken, async (req, res) => {
    try {
        // start db operations
        await Products.create(req.body)              //Products.create(req.body) TO INSERT MULTIPLE RECORDS. NEED TO PASS ARRAY OF OBJECT FROM FE
        res.send({ message: 'Product added successfully!' })
    } catch (error) {
        res.send({ message: error.message })
    }
})

router.put('/update',verifyToken, async (req, res) => {
    // start db operations
    try {
         const { _id, title, amount, description } = req.body;                    // THIS METHOD IS TO UPDATE ULTIPLE RECORDS EX THOSE RECORDS THAT HAVE TITLE 'Realme note 50' THOSE ALL WILL BE UPDATED 
        let updatedProduct= await Products.findOneAndUpdate(                       // let updatedProduct= await Products.updateMany(
            { _id },                                                               // { title: "Realme note 50" },
            { $set: { title, amount, description } },                              // { $set: { title, amount, description } },
            { new: true }                                                          //  { new: true }
        );
        if(!updatedProduct){
            res.send({ message: 'Record not found!',data: updatedProduct });
            return;
        }
        res.send({ message: 'Record updated successfully!',data: updatedProduct });
    } catch (error) {
        res.send({ message: error.message })
    }
})

router.delete('/delete/:_id',verifyToken, async(req, res) => {
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

router.delete('/deleteAll',verifyToken, async(req, res) => {
    // start db operations
    try {
        await Products.deleteMany({})                               // Products.deleteMany(req.body) IT WILL DELETE MULTIPLE SPECIFIC RECORDS EX+> IF req.body={amount:1000} THEN IT WILL DELETE ALL RECORDS THAT HAVE AMOUNT EQUALS TO 1000
        res.send({ message: 'All Records deleted successfully!' })
    } catch (error) {
        res.send({ message: error.message })
    }
})


router.get('/search/:key',verifyToken, async(req, res) => {
    // start db operations
    try {
        const searchKey=req.params.key;
        const data = await Products.find(
                { "title": { $regex:searchKey, $options: 'i' } } // $options: 'i'  is added to prevent from case sensitiveness
                // { "desc": { $regex:searchKey, $options: 'i' } } we can add search on multiple fields / keys by just adding more options
        )                             
        res.send({ data })
    } catch (error) {
        res.send({ message: error.message })
    }
})


export default router