import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  const { name, price, category } = req.body;
  try {
    const newProduct = new Product({ name, price, category });
    await newProduct.save();
    res
      .status(201)
      .send({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).send({ message: 'Error creating product', error });
  }
});

router.get('/all', async (req, res) => {
  try {
    const products = await Product.find({}).populate('category');
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching products', error });
  }
});


export default router;