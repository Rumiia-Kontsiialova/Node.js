// Импорт модуля http
const http = require('http');

const PORT = 3000;

// Создание web-сервера
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('Hello, Node.js');
})

// Запуск и прослушивание сервера
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})