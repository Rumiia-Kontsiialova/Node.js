// Импортируйте модуль `fs`.
const fs = require('fs');

// Создайте файл с именем `info.txt` и запишите в него текст "Node.js is awesome!"
fs.writeFile('info.txt', 'Node.js is awesome!', (err) => {
    if(err) {
        console.error('Ошибка записи в файл: ', err);
        return;
    }
    console.log('Файл info.txt успешно записан');

// Прочитайте содержимое файла `info.txt`.
    fs.readFile('info.txt', 'utf8', (err, data) => {
        if(err) {
            console.error('Ошибка чтении файла: ', err);
            return;
        }
        console.log('Содержимое info.txt: ', data);
    });
});


// альтернативный способ с созданием переменных
// Импорт модуля 'fs'
// const fs = require('fs');

// // Путь к файлу
// const fileName = 'info.txt';
// const fileContent = 'Node.js is awesome!';

// // 1. Запись текста в файл
// fs.writeFile(fileName, fileContent, (err) => {
//   if (err) {
//     console.error('Ошибка при записи в файл:', err);
//     return;
//   }
//   console.log(`Файл ${fileName} успешно создан и записан.`);

//   // 2. Чтение содержимого файла
//   fs.readFile(fileName, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Ошибка при чтении файла:', err);
//       return;
//     }
//     console.log('Содержимое файла:', data);
//   });
// });
