import express from 'express'
import routes from './routes/index.mjs'
import mongodb from './config/db.mjs'

const app = express()

app.listen(3001, () => {
    console.log('Server is listening to 3001')
})

mongodb.connection.once('open',()=>{
    console.log('db connected successfully!')
})
app.use('/',routes)