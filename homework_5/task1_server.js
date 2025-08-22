import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

// создание сервера
const server = http.createServer((req, res) => {
    //установка заголовка
    res.setHeader('Content-Type', 'text/plain');

    // проверка заголовка Authorization 
const auth = req.headers['authorization']; // Писать headers нужно обязательно — это официальное имя свойства в объекте req (запроса), которое предоставляет сам Node.js

if(!auth) {
    res.statusCode = 401;
    res.end('Unauthorized');
} else {
    res.statusCode = 200;
    res.end('Authorization header received');
};
});

server.listen(PORT, () => {
    console.log(`Server is running at the http://localhost:${PORT}`);
});