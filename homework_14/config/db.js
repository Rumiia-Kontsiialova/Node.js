import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.MONGO_URL;

async function connectToDatabase() {
    try {
        mongoose.connect(URL);
        console.log('Успешное подключение к MongoDB');
    } catch (error) {
        console.error('Ошибка подключения к MongoDB: ', error);
    }
};


export default connectToDatabase;