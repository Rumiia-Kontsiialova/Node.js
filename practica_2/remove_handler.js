const EventEmitter = require('events');

const emitter = new EventEmitter();

function fs() {
    console.log('Обработчик события номер один');
}

emitter.on('event', fs);

emitter.emit('event');
emitter.off('event', fs);
emitter.emit('event')