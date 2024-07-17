
import multer from 'multer'

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'filesUpload')
    },
    filename:(req,file,cb)=>{
        const fileExtension= file.mimetype.split('/')[1]
        cb(null,file.fieldname + '_' + Date.now() + '.' + fileExtension )
    }
})

export const uploadOnFolder = multer({ storage: storage}).single('file')

/* while caling from FE we need to set header like 
headers: {
    'Content-Type': 'multipart/form-data',
  },
   */