import express from 'express';
import sequelize from './config/db.js';import dotenv from 'dotenv';
dotenv.config();
import Book from './models/books.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', ( _, res ) => {
    res.send('Home Page');
});

// подключение к базе данных
sequelize.authenticate()
    .then(() => console.log('DB connected'))
    .catch(err => console.error('DB connected: ', err));
    
// GET запрос для получения всех книг
app.get('/books', async ( _, res ) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error get books' });
    }
});

// POST запрос для создания новой книги
app.post('/books', async ( req, res ) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Error to create book' });
    }
})

// PUT запрос для обновления книги по ее id
app.put('/books/:id', async (req, res) => {
    try {
        const [updated] = await Book.update(req.body, {
        where: { id: req.params.id },
        });
        if (updated) {
            const updatedBook = await Book.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error to update book' });
    }
});

// DELETE для удаления книги по её id
app.delete('/books/:id', async (req, res) => {
    try {
        const deleted = await Book.destroy({
         where: { id: req.params.id },
    });
    if (deleted) {
       res.status(200).json({ message: 'Book deleted' });
    } else {
       res.status(404).json({ error: 'Book not found' });
    }
    } catch (error) {
        res.status(500).json({ error: 'Error to delete book' });
    }
});


app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been successfully.');
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error to connect to the database:', error);
    }
});