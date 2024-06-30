import express from 'express'
import Products from '../modals/products.mjs'
import verifyToken from '../middlewares/verifyToken.mjs'
import { uploadOnFolder } from '../middlewares/uploadFiles.mjs'
import EventEmitter from 'events' // name EventEmitter should be first letter uppercase whenever we import events b/c events are class
const router = express.Router()
const event = new EventEmitter();

let count=0
event.on('allProducts',()=>{ // takes 2 parameters first on should be event name that we call for event.emit function
    count++
    console.log('event called',count);
})
/* this is basic example of events use case would be if user hit login api 5 times with wrong credentials then we can stop 
   stop the user to hit more time and wait them for 5 min by sending some message from backend . We can store count value
   in database so when user refereshes page warning still shows to them
*/

router.get('/', async (req, res) => {
    try {
        // start db operations
        event.emit('allProducts');
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

router.post('/upload',uploadOnFolder, async(req, res) => {
    // start db operations
    try {                           
        res.send({message:'file upload successfully!' })
    } catch (error) {
        res.send({ message: error.message })
    }
})


export default router