import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const BASE_URL = `http://localhost:${PORT}`;


// Логин и получение токена
async function testLogin() {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: 'Rumiia@gmail.com',
      password: '12345abcde', // правильный пароль из index.js
    });
    console.log(' Token received: ', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Login error: ', error.response.data);
    } else {
      console.error('Network error');
    }
  }
}

// Проверка защищённого маршрута
async function testProtected(token) {
  try {
    const response = await axios.get(`${BASE_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Protected OK: ', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Acces error: ', error.response.data);
    } else {
      console.error('Network error');
    }
  }
}


// Обновление email
async function testUpdateEmail(token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/update-email`,
      { email: 'updated_email@example.com' },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Email updated:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Email update error:', error.response.data);
    } else {
      console.error('Network error');
    }
  }
}

// Проверка пользователей
async function testGetUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log('User list:', response.data);
  } catch (error) {
    console.error('Error getting users');
  }
}
//  Запуск последовательности тестов
const token = await testLogin();

if (token) {
  // Проверка защищённого маршрута (через 1 секунду)
  setTimeout(async () => {
    await testProtected(token);
  }, 1000);

  // Обновление email (через 2 секунды)
  setTimeout(async () => {
    await testUpdateEmail(token);
  }, 2000);

  // Получение пользователей (через 3 секунды)
  setTimeout(async () => {
    await testGetUsers();
  }, 3000);
}
