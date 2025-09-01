import express from 'express';
import { connectToDatabase, getDB } from './db/index.js';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectToDatabase()
    .then(()=> app.listen(PORT, ()=> {
        console.log(`Server running on http://localhost:${PORT}`)
    }))
    .catch( err => console.error('Error connecting to MongoDB', err));

app.use(express.json());

app.get('/', (_, res) => {
    res.send('Home page');
});


// POST /products — создание продукта
app.post('/products', async (req, res) => {
    try {
        const db = getDB();
        const product = req.body;

        const { name, price, description } = product;
      // Валидация данных ( если эти данные отсутсвуют - срабатывает ошибка, что поля обязательны )
      if (!name || !price || !description) {
         return res.status(400).send({ error: 'The fields name, email and description must be filled' });
      }
        const result = await db.collection('products').insertOne(product); // Добавляем продукт в коллекцию
        console.log(result);
        res.status(201).send(result); // Возвращаем созданый продукт
    } catch (error) {
        res.status(500).send({error: 'Error creating user'});
    }
});


// GET /products – получение всех продуктов
app.get('/products', async (_, res) => {
    try {
        const db = getDB();
        const products = await db.collection('products').find().toArray();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: 'Errro fetching products' });
    }
});


// GET /products/:id – получение продукт по id
app.get('/products/:id', async (req, res) => {
    try {
        const db = getDB();
        const productId = req.params.id;

        if (!ObjectId.isValid(productId)) {
            return res.status(400).send({ error: 'Invalid product id' });
        }

        const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });

        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching product' });
    }
});


// PUT /products/:id – обновление продукта
app.put('/products/:id', async (req, res) => {
    try {
        const db = getDB();
        const productId = req.params.id;
        const updateData = req.body;

        if (!ObjectId.isValid(productId)) {
            return res.status(400).send({ error: 'Invalid product id' });
        }

        const result = await db.collection('products').updateOne(
            { _id: new ObjectId(productId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({ error: 'Product not found' });
        }

        res.status(200).send({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error updating product' });
    }
});


// DELETE /products/:id – удаление продукта
app.delete('/products/:id', async (req, res) => {
    try {
        const db = getDB();
        const productId = req.params.id;

        if (!ObjectId.isValid(productId)) {
            return res.status(400).send({ error: 'Invalid product ID' });
        }

        const result = await db.collection('products').deleteOne({ _id: new ObjectId(productId) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Product not found' });
        }

        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error removing product' });
    }
});