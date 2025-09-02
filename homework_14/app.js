import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3003;

const app = express();

app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`Server is running on port: http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
});