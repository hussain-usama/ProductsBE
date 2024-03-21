import express from 'express'
import routes from './routes/index.mjs'
const app = express()

app.listen(3001, () => {
    console.log('Server is listening to 3001')
})

app.use('/',routes)