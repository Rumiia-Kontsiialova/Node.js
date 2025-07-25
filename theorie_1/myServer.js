// создания сервер, импортируя модуль http
const http = require('http');

const server = http.createServer(( req, res ) => {
    res.setHeader('Content-Type', 'text-plain');

    if (req.url === '/') {
        res.statusCode = 200;
        res.end('This is Home Page');
    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.write('I study node.js :)');
        res.end('This is About Page')
    } else if (req.url === '/secret') {
        res.statusCode = 200;
        res.write('I study node.js :)');
        res.end('This is About Page')
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})