import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.MONGO_URL;
const DB_NAME = process.env.MONGO_DB_NAME;

const client = new MongoClient(URL);
let dbConnection;

// подключение к базе данных
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connection successful to the MongoDB');
        dbConnection = client.db(DB_NAME);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);   
    }
}

function getDB() {
    if (!dbConnection) {
        throw new Error('Database not connected')
    }
    return dbConnection
}

export { connectToDatabase, getDB }
