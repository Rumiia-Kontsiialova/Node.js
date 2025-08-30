import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const BASE_URL = `http://localhost:${PORT}`;

async function loginAsAdmin() {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: 'admin@example.com',       // Email администратора
      password: 'adminpassw',            // Пароль должен совпадать с тем, что в сервере
    });

    console.log(' Admin is authorized. Token:');
    console.log(response.data.token);
    return response.data.token;

  } catch (err) {
    console.error('Admin login error:', err.response?.data || err.message);
  }
}

async function testUpdateRole(token) {
  try {
    const response = await axios.put(`${BASE_URL}/update-role`, {
      userId: 2,                       // ID пользователя, роль которого меняем
      newRole: 'moderator'             // Новая роль
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Role successfully updated:');
    console.log(response.data);

  } catch (err) {
    console.error('Role update error:', err.response?.data || err.message);
  }
}

async function viewUsers() {
  try {
    const res = await axios.get(`${BASE_URL}/users`);
    console.log('Current users');
    console.log(res.data);
  } catch (err) {
    console.error('Error getting users:', err.message);
  }
}

(async () => {
  const token = await loginAsAdmin();
  if (token) {
    await testUpdateRole(token);
    await viewUsers();
  }
})();