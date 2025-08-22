import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    if(req.method === 'PUT') { // PUT запрос
        res.statusCode = 200;
        res.end('PUT request processed');
    } else if (req.method === 'DELETE') { // DELETE запрос
        res.statusCode = 200;
        res.end('DELETE request processed');
    } else {
        res.statusCode = 405;
        res.end('Method not supported');
    }
});

server.listen(PORT, () => {
  console.log(`Server is running on  http://127.0.0.1:${PORT}`);
});