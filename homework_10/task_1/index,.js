import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT;
const PORT = process.env.PORT;

const app =express();
app.use(express.json());

// Псевдо-база пользователей с нужными полями
const users = [
  {
    id: 1,
    username: 'Rumiia',
    email: 'Rumiia@gmail.com',
    password: '', // временно, заменим позже на хеш
  }
];

// Хешируем пароль заранее
users[0].password = await bcrypt.hash('12345abcde', 10);

// Middleware для логирования запросов 
function logRequest(req, _res, next) {
  console.log(`Method request: ${req.method}. URL request: ${req.url}`);
  next();
}
app.use(logRequest);

// Middleware для проверки JWT
function authenticateJWT(req, res, next) {
    // Извлекаем токен из заголовка Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access: no token provided' });
    }

    jwt.verify(token, SECRET_JWT, (err, user) => {
        if (err) {
            return res.status(403).send({ message: 'The token is invalid or expired' });
        }
        req.user = user;
        next();
    });
}

// Главная страница
app.get('/', (_, res) => {
  res.send('Home page');
});

// Логин и генерация токена
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
       // Ищем пользователя
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(404).send({ message: 'Not found user' });
        }
       // Проверка пароля
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send({ message: 'Invalid password' });
        }
        // Генерируем токен
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                userName: user.name,
            },
            SECRET_JWT,
            { expiresIn: '10s' }
        );
        // Отправляем токен
        res.send(token);

    } catch (error) {
        res.status(500).send({ message: 'Server error' });
        console.error('Server error: ' + error.message);
    }
});

// Защищённый маршрут
app.get('/protected', authenticateJWT, (req, res) => {
    res.send({ message: 'Welcome to the protected route!', user: req.user });
});

// Маршрут обновления email
app.put('/update-email', authenticateJWT, (req, res) => {
    const { email: newEmail } = req.body;
    if (!newEmail) {
        return res.status(400).send({ message: 'New email is required' });
    }
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    user.email = newEmail;

    res.status(200).send({
        message: 'Email updated successfully',
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
});

// Только для проверки — вывод всех пользователей
app.get('/users', (_req, res) => {
    res.send(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});