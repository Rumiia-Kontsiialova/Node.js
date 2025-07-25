const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('event', () => {
    console.log('Вызов первого обработчика');
});

emitter.on('event', () => {
    console.log('Вызов второго обработчика');
});

emitter.emit('event')