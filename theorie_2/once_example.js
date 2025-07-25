const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.once('onceEvent', () => {
    console.log('once method')
})

emitter.emit('onceEvent')
emitter.emit('onceEvent')
emitter.emit('onceEvent')

// благодаря методу once запускается лишь один раз, который первый по списку