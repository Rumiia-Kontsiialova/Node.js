const EventEmitter = require('events');

const emitter = new EventEmitter();

function countDown(seconds, emitter) {
    const rest = seconds;
    const interwal = setInterval(() => {
         if (rest > 0) {
            emitter.emit('tik', rest)
            rest-- 
        } else {
            clearInterval(interwal)
            emitter.emit('end')
        }
    }, 1000)   
}

emitter.on('tik', (rest) => {
    console.log(rest)
}) 


emitter.on('end', () => {
    console.log('Обработчик событий окончен')
}) 

countDown(5, emitter)