const fs = require('fs');

const readStream = fs.createReadStream('inputFile.txt', 'utf8');

const writeStream = fs.createWriteStream('outputPipe.txt', 'utf8');

readStream.pipe(writeStream);

writeStream.on('finish', ()=>{
    console.log('Копирование файлов завершено')
})
readStream.on('error', (error)=>{
    console.log('Ошибка чтения' + error)
})
writeStream.on('error', (error)=>{
    console.log('Ошибка записи' + error)
})