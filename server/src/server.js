import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import mongoose from 'mongoose'
import 'dotenv/config'
import mainRouter from './routes/router.js'

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

const port = process.env.PORT || 8000

const server = http.createServer(app)

app.use('/api/v1', mainRouter)

app.get('/', (req, res) => {
  res.send('api is working')
})


mongoose.connect(process.env.DB_URL).then(() => {
  console.log('db connected');
  
}).catch(err => {
  console.log({err});
  process.exit(1)
})


server.listen(port, () => {
  console.log(`server running on port ${port}`);
})
