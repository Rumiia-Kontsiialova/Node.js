import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const BASE_URL = `http://localhost:${PORT}`;

async function testLogin() {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: 'admin@example.com',     // email из базы
      password: 'adminpassw',           // пароль из хеширования
    });
    console.log('Token received :', response.data.token);
    return response.data.token;
  } catch (error) {
    console.error('Error login: ', error.response?.data || error.message);
  }
}

async function testProtected(token) {
  try {
    const response = await axios.get(`${BASE_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Protected OK:', response.data);
  } catch (error) {
    console.error('Access error:', error.response?.data || error.message);
  }
}

async function testRefreshToken(token) {
  try {
    const response = await axios.post(`${BASE_URL}/refresh-token`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Token updated:', response.data.token);
    return response.data.token;
  } catch (error) {
    console.error('Token update error:', error.response?.data || error.message);
  }
}

(async () => {
  const token = await testLogin();
  if (!token) return;

  await testProtected(token);

  // Обновляем токен
  const newToken = await testRefreshToken(token);
  if (!newToken) return;

  // Проверяем доступ с новым токеном
  await testProtected(newToken);
})();