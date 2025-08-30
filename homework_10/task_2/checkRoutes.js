import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const BASE_URL = `http://localhost:${PORT}`;

async function testLogin() {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: 'example@gmail.com',
      password: '12345abcde',
    });
    console.log('Token received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error login:', error.response?.data || error.message);
  }
}

async function testProtected(token) {
  try {
    const response = await axios.get(`${BASE_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Protected is OK:', response.data);
  } catch (error) {
    console.error('Access error:', error.response?.data || error.message);
  }
}

async function testDeleteAccount(token) {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-account`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Account deleted:', response.data);
  } catch (error) {
    console.error('Error deleting:', error.response?.data || error.message);
  }
}

async function testUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log('User list:', response.data);
  } catch (error) {
    console.error('Error getting users:', error.message);
  }
}

const token = await testLogin();
await testProtected(token);
await testDeleteAccount(token);
await testUsers(); // проверяет удалилися ли пользователь