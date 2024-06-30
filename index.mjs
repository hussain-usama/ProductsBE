import express from 'express'
import routes from './routes/index.mjs'
import mongodb from './config/db.mjs'
import cors from 'cors'

const app = express()


/* TO LOOK AND RESERACH ON THIS CURRENTLY IT IS DONE FOR CORSE-ORIGIN-POLICY-ERROR  */

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

  
app.listen(3001, () => {
    console.log('Server is listening to 3001')
})

mongodb.connection.once('open',()=>{
    console.log('db connected successfully!')
})

app.use(express.json()) //Backend ko batana ka tumhari bodies ki type JSON hogi
app.use(cors())
app.use('/',routes)