import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

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

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send({ message: 'Access denied: insufficient role' });
    }
    next();
  };
}

// Главная страница
app.get('/', (_, res) => {
  res.send('Home page');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).send({ message: 'User not found' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send({ message: 'Invalid password' });

  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username, role: user.role },
    SECRET_JWT,
    { expiresIn: '10m' }
  );

  res.send({ token });
});

app.put('/update-role', authenticateJWT, authorizeRole('admin'), (req, res) => {
  const { userId, newRole } = req.body;
  if (!userId || !newRole) return res.status(400).send({ message: 'userId and newRole required' });

  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).send({ message: 'User not found' });

  user.role = newRole;
  res.send({ message: 'Role updated successfully', user });
});

app.get('/users', (req, res) => {
  res.send(users);
});


// Хешируем пароли и запускаем сервер
(async () => {
  users[0].password = await bcrypt.hash('adminpass', 12);
  users[1].password = await bcrypt.hash('userpass', 12);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();