import express from 'express';
import dotenv from 'dotenv';
import { db } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get('/', (_, res) => {
    try {
        res.send('Hello, World!');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.post('/', (req, res) => {
    const data = req.body;
    if (!data || !data.name) {
    return res.status(400).json({ message: 'The name field is required' });
  }
    res.status(201).json({ message: `Data received: ${data.name}` });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

