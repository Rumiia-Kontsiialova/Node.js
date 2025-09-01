import express from 'express';
import { connectToDatabase, getDB } from './db/index.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase()
    .then(()=> app.listen(PORT, ()=> {
        console.log(`Server running on http://localhost:${PORT}`)
    }))
    .catch( err => console.error('Failed to start the server due to MongoDB connection issue', err));

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Home page');
});