// Импортируем встроенный модуль fs(FileSystem)
// Подключаем модуль fs для работы с файлами
const fs = require('fs');

// создаю функцию для записи логов
function logMessage(message) {
    const log = `${new Date().toISOString()} - ${message}\n`; // формируем строку с датой и сообщением

    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.error('Ошибка при записи в лог: ', err);
        } else {
            console.log('Сообщение записаоно в лог!');
        }
    })
}

// экспорт logger.js, чтобы использовать в app.js
module.exports = { logMessage }