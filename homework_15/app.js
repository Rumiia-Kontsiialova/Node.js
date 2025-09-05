import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const server = http.createServer(app);
const io = new Server(server);

// Чтобы использовать __dirname с ES-модулями
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Подключаем папку public как источник статики
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Обработка WebSocket-соединения
io.on('connection', (socket) => {
    console.log('Client connected: ', socket.id);
    socket.on('message', (msg) => {
        console.log('Message: ', msg);
       // Отправляем сообщение всем клиентам
       io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected: ', socket.id);  
    });
});

// Пример POST-запроса
app.post('/create-user', (_, res) => {
    res.send('User created');
});


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});