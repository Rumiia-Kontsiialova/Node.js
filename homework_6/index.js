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

// GET /products  получаем все продукты
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, results) => {
        if (err) {
        return res.status(500).json({ error: 'Error receiving products' });
        }
        res.json(results);
    });
});

// POST добавление продукта /products
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Fields are required' });
    }

    db.query(
    'INSERT INTO products (name, price) VALUES (?, ?)',
    [name, price],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error adding product' });
      }
      res.status(201).json({
        message: 'Products added successfully',
        productId: result.insertId
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
