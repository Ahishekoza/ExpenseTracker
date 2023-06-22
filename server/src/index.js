import express from 'express';
const app = express();
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from '../config/db.js';
import userRouter from './routes/userRouter.js'

connectDB()

dotenv.config()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api',userRouter)

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})