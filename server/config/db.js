import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const connectDB =async() => {
    try {
        const cont = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connection established successfully ${cont.connection.host}`)
    } catch (error) {
        console.log(`Unable to connect Mongodb ${process.env.MONGO_URL}`)
    }
}

export default connectDB