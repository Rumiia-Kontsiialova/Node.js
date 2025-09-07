import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

const users = [];

app.use(express.json());

// Middleware для проверки роли admin
const isAdmin = (req, res, next) => {
    const {email} = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).send('User is not found');
    }
    if (user.role !== 'admin') {
        return res.status(403).send('Acces denied: Admins only');
    }
    next(); // доступ разрешён
 }

// ЗАДАЧА 1: Регистрация с проверкой уникальности email
app.post('/register', async (req, res) => {
    const { email, password } = req.body; // Получаем email и введённый пароль от пользователя
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        // users.push({email, password: hashedPassword});
          users.push({
            email,
            password: hashedPassword,
            mustChangePassword: true,
            role: 'admin', // ← фиксируем здесь
        });
        res.status(201).send('The user was created successfully');

    } catch (error) {
        console.error('Registration error: ', error)
        res.status(500).send('Registration error');
    }
});

// ЗАДАЧА 2: Реализация принудительного обновления пароля
app.post('/change-password', async (req, res) => {
    const { email, newPassword } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).send('User is not found');
    }
    try {
        const hashed = await bcrypt.hash(newPassword, 12);
        user.password = hashed;
        user.mustChangePassword = false;
        res.send('Password changed successfully'); 
    } catch (error) {
        console.error('Error changing password: ', error);
        res.status(500).send('Failed to change password');
    }
})

// ЗАДАЧА 3: Реализация функции удаления аккаунта
app.post('/delete-account', async (req, res) => {
    const { email, password } = req.body; 
    // Ищем индекс пользователя в массиве по email
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) {
        // Если пользователь не найден — возвращаем ошибку
        return res.status(400).send('User is not found');
    }
    // Получаем сам объект пользователя из массива по индексу
    const user = users[userIndex];
    // Сравниваем введённый пароль с сохранённым хэшем пароля
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        // Если пароли не совпадают — возвращаем ошибку
        return res.status(401).send('Incorrect password');
    }
    // Если всё верно — удаляем пользователя из массива
    users.splice(userIndex, 1);
    // Отправляем успешный ответ
    res.send('Account deleted successfully');
});

// ЗАДАЧА 4:Ограничение доступа к маршрутам на основе роли 
app.post('/admin', isAdmin, (_, res) => {
    res.send('Welcome, admin!')
});

// ЗАДАЧА 5: Реализация функции изменения email
app.post('/change-email', async (req, res) => {
    const { email, newEmail, password} = req.body;

    // Найти пользователя по текущему email
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).send('User is not found');
    }
    // Проверка, существует ли уже пользователь с новым email
    const emailExists = users.some(u => u.email === newEmail);
    if (emailExists) {
        return res.status(400).send('New email already in use');
    }
    // Проверка пароля
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).send('Incorrect password');
    }
    // Обновляем email
    user.email = newEmail;
    console.log('Current users:', users); // ← смотрeть, что хранится
    res.send('Email updated successfully');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

