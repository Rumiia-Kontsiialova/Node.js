import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// "База" пользователей
const users = [
  {
    id: 1,
    username: 'admin_user',
    email: 'admin@example.com',
    password: '', // будет хешироваться
    role: 'admin',
  },
  {
    id: 2,
    username: 'regular_user',
    email: 'user@example.com',
    password: '', // будет хешироваться
    role: 'user',
  }
];

// Middleware для проверки JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Unauthorized: no token provided' });

  jwt.verify(token, SECRET_JWT, (err, user) => {
    if (err) return res.status(403).send({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Главная страница
app.get('/', (_, res) => {
  res.send('Home page');
});

// Логин и выдача токена
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).send({ message: 'User not found' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send({ message: 'Invalid password' });

  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username, role: user.role },
    SECRET_JWT,
    { expiresIn: '1m' } // короткий срок жизни токена для теста обновления
  );

  res.send({ token });
});

// Защищённый маршрут для проверки токена
app.get('/protected', authenticateJWT, (req, res) => {
  res.send({ message: 'You accessed protected data!', user: req.user });
});

// Маршрут обновления токена
app.post('/refresh-token', authenticateJWT, (req, res) => {
  const user = req.user;

  // Создаём новый токен с тем же полезным грузом, но обновляем expiresIn
  const newToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    },
    SECRET_JWT,
    { expiresIn: '10m' } // например, 10 минут
  );

  res.send({ token: newToken });
});
// Хешируем пароли и запускаем сервер
(async () => {
  users[0].password = await bcrypt.hash('adminpass', 12);
  users[1].password = await bcrypt.hash('userpass', 12);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();