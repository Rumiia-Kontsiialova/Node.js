const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.once('event', () => {
    console.log('Вызван обработчик событий');
})

emitter.emit('event');
emitter.emit('event');
