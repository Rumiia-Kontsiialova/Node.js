// Задание 2
// создаем переменную и в не берем класс
const EventEmitter = require('events');
const { futimes } = require('fs');

// этот объект будет использоваться для работы с событиями
const emitter = new EventEmitter();  // использование ключевого слова new для создания нового экземпляра класса EventEmitter

// определение первого обработчика события
function firstHandler(data, num, bool) {
    console.log('Первый обработчик события - event ' + data, num, bool);
}

// определение второго обработчика (у нас два обработчика под одно и тоже событие)
function secondHandler() {
    console.log('Второй обработчик события - event');
}

// регистрация первого обработчика события event 
emitter.on('event', firstHandler);

// регистрация второго обработчика события event
emitter.on('event', secondHandler);

// удаление первого обработчика события event
// emitter.removeListener('event', firstHandler);

// гернерация события event
emitter.emit('event', 'Это наши данные', 123, true);