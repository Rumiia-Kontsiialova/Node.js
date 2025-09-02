import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res
      .status(201)
      .send({
        message: 'Category created successfully',
        category: newCategory,
      });
  } catch (error) {
    res.status(500).send({ message: 'Error creating category', error });
  }
});

router.get('/all', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching category', error });
  }
});

export default router;