import mongoose from "mongoose";

const { Schema } = mongoose

const fileSchema = new Schema({
    path:{
        type:String,
        required:true
    },
    originalName:{
        type:String,
        required:true
    },
    // downloadCount:{
    //     type:String,
    //     required:true
    // },
    // password:String
    },{
        versionKey: false 
})

const FilesUpload=mongoose.model('files',fileSchema)

export default FilesUpload