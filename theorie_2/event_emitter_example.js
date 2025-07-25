// Задание 1
// импортировать class EventEmitter
const EventEmitter = require('events');

// создаем новый экземпляр class EventEmitter
// Этот объект будет использоваться для работы с событиями(создание, генераия, прослушаивания или удаление)
const emitter = new EventEmitter(); // emitter пишем с маленькой буквы потому что это объект, а EventEmitter - класс

// регистрируем обработчик события (on())
emitter.on('myEvent', () => {
    console.log('Событие произошло!')
});

// генерируем(создаем) событие
emitter.emit('myEvent');