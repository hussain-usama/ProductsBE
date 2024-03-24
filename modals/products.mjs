import mongoose from "mongoose";

const {Schema} = mongoose

const productSchema= new Schema({
    title:String,
    amount:Number,
    description:String
})

const Products=mongoose.model('products',productSchema)

export default Products