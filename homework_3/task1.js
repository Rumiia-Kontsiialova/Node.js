//  Импортируйте модуль `fs`.
const fs = require('fs');

// Создайте каталог с именем `myFolder` в текущей директории.
fs.mkdir('myFolder', (err) => {
    if(err) {
        console.error('Error: ', err);
    } else {
        console.log('Папка myFolder успешно создана');
    }
    // Удалите каталог `myFolder`.
    fs.rmdir('myFolder', (err) => {
        if(err) {
        console.error('Error: ', err);
    } else {
        console.log('Папка myFolder удалена');
    }
    });
});
