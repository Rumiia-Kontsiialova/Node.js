// Импортируем наш модуль
const dateModule = require('./dateModule');

// Используем функции
const currentDate = dateModule.getCurrentDate();
const currentTime = dateModule.getCurrentTime();

console.log(`Current Date: ${currentDate}`);
console.log(`Current Time: ${currentTime}`);