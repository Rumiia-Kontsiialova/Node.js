const fs = require('fs');
const http = require('http');

const PORT = 3002;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    if (req.url === '/') {
        res.statusCode = 200;
        res.end('Home Page');
    } else if (req.url === '/readFile') {
        fs.readFile('example.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Ошибка при чтении файла: ', err);
                return;
            }
            console.log('Содержимое файла: ', data);
            res.statusCode = 200;
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end('Page Not Found');
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


// console.log('Это сообщение появится первым, так как чтение файла асинхронно');