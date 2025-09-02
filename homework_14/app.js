import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// import userRouter from './routes/userRoutes.js';
// import postRouter from './routes/postRoutes.js';
// import updateRouter from './routes/userRoutes.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// app.use('/users', userRouter);

// app.use('/posts', postRouter);


app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Оибка при запуске сервера');
    }
});