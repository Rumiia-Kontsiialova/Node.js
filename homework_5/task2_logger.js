import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    try {
        throw new Error('Test server error'); // специально логируем ошибку
    } catch (error) {
        const errorMessage = error.message;

        // логируем ошибку в errors.log 
        fs.appendFile('errors.log', errorMessage, (err) => {
            if (err) {
                console.error('Failed to write to file error:', err); 
            }
        });

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
    }
});

server.listen(PORT, () => {
  console.log(`Server is running on  http://127.0.0.1:${PORT}`);
});