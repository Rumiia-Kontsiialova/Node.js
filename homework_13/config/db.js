import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Successfull connection to MongoDB')
    } catch (error) {
        console.error('Error connection to MongoDB', error)
    }
};

export default connectToDatabase;