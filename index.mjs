import express from 'express'
import routes from './routes/index.mjs'
import mongodb from './config/db.mjs'

const app = express()


/* TO LOOK AND RESERACH ON THIS CURRENTLY IT IS DONE FOR CORSE-ORIGIN-POLICY-ERROR

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  }); */

  
app.listen(3001, () => {
    console.log('Server is listening to 3001')
})

mongodb.connection.once('open',()=>{
    console.log('db connected successfully!')
})

app.use(express.json()) //Backend ko batana ka tumhari bodies ki type JSON hogi

app.use('/',routes)