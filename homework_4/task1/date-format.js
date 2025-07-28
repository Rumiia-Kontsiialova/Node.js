const moment = require('moment');

// Получаем текущую дату и время
const now = moment();

const format1 = now.format(`DD-MM-YYYY`);
const format2 = now.format(`MMM Do YY`);
const format3 = now.format(`dddd`);

console.log('Format 1: ', format1);
console.log('Format 2: ', format2);
console.log('Format 3: ', format3);


// вариант с масивом

// const moment = require('moment');

// // Получаем текущую дату и время
// const now = moment();

// const formats = [
//     { label: 'Format 1 (DD-MM-YYYY)', value: 'DD-MM-YYYY' },
//     { label: 'Format 1 (MMM Do YY)', value: 'MMM Do YY' },
//     { label: 'Format 1 (dddd)', value: 'dddd' }
// ];

// // проходим по массиву и вывести каждый формат
// formats.forEach(format => {
//     console.log(`${format.label}: ${now.format(format.value)}`)
// });

