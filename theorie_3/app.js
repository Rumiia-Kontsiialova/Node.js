const fs = require('fs');
const path = require('path');

const dirpath = path.join(__dirname, 'test')
fs.mkdir('test', (err) => {
    if(err) {
        console.error('Error: ', err);
        return;
    }
    console.log('Папка создана');
    const filePath = path.join(dirpath, 'example.txt')
    fs.writeFile(filePath, 'Hello World', 'utf8', (err) => {
        if(err) {
            console.error('Error: ', err);
            return;
        } 
        console.log('Файл записан')
        fs.readdir(dirpath, (err, files) => {
            if(err) {
                console.error('Error: ', err);
                return;
            } 
            console.log('test', files);
        })
    })
})

