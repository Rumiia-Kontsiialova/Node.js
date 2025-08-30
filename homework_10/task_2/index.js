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
    password: '', 
  }
];

// Middleware для проверки JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Token not provided' });
  }

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

// Логин
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).send({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).send({ message: 'Invalid password' });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_JWT, { expiresIn: '10s' });
  res.send(token);
});

// Защищённый маршрут
app.get('/protected', authenticateJWT, (req, res) => {
  res.send({ message: 'Protected route', user: req.user });
});

//  Маршрут для удаления аккаунта
app.delete('/delete-account', authenticateJWT, (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.user.id);

  if (userIndex === -1) {
    return res.status(404).send({ message: 'User not found' });
  }

  // Удаляем пользователя из массива
  users.splice(userIndex, 1);

  res.status(200).send({ message: 'Account successfully deleted' });
});

// Только для отладки — получить всех пользователей
app.get('/users', (_, res) => {
  res.send(users);
});

//  Хешируем пароль и запускаем сервер
(async () => {
  users[0].password = await bcrypt.hash('12345abcde', 12);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();

console.log("JWT:", token);
