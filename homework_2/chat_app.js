// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Напишите функцию `sendMessage`, которая принимает имя пользователя, сообщение и объект `EventEmitter`
function sendMessage (userName, message, emitter) {
    // Внутри функции `sendMessage` генерируйте событие `message` с именем пользователя и сообщением.
    emitter.emit('message', { userName, message });
}
// Зарегистрируйте обработчик для события `message`, чтобы выводить сообщение в формате "User: Message".
emitter.on('message', (data) => {
    console.log(`${data.userName}: ${data.message}`);  // строка через конкантенацию будет выгляжеть так: console.log(data.userName + ": " + data.message);
});

// Вызовите функцию `sendMessage` несколько раз с разными пользователями и сообщениями.
sendMessage('John', 'Всем привет!', emitter);
sendMessage('Alice', 'Как дела?', emitter);
sendMessage('Bob', 'Все отлично!Как твои?', emitter);
