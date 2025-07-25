const fs = require('fs');

const readStream = fs.createReadStream('inputFile.txt', 'utf8');
readStream.on('data', (chunk) => {
    console.log('Получена часть данных', chunk);
});

readStream.on('end', () => {
    console.log('End');
});

readStream.on('error', (err) => {
    console.log('Error: ', err);
});