const http = require('http');

const PORT = 3005;

// createServer это коллбэк функция, которая принимает два параметра

const server = http.createServer(( req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    
    if(req.url === '/') {
        res.statusCode = 200;
        res.end ('Welcome to the Home Page');
    } else if 
        (req.url === '/about') {
        res.statusCode = 200;
        res.end ('About Us');
    } else {
        res.statusCode = 404;
        res.end ('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})