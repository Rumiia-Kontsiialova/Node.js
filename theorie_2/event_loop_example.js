console.log('Start'); //запустится 1

setTimeout(() => {
    console.log('setTimeout'); //запустится 4
}, 5000);

Promise.resolve().then(() => {
    console.log('Promise callback'); //запустится 3
});

console.log('End'); //запустится 2