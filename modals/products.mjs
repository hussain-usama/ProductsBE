import mongoose from "mongoose";

const {Schema} = mongoose

const productSchema= new Schema({
    title:{
        required:true,
        type:String,
        minlength:2
    },
    amount:{
        required:true,
        type:Number
    },
    description:String,
},{
    /*Mongodb is adding key automatically  _v.  The addition of the _v field is a default behavior of Mongoose.
     It represents the version key and is used internally by Mongoose for handling document versions. 
     It's not directly related to your validation options or schema definition
     By using versionKey:false it does not add _v */
    versionKey: false 
})

const Products=mongoose.model('products',productSchema)

export default Products