const fs = require('fs');
const {performance} = require('perf-hooks');

async function testChunkSize(sizeChunk) {
    return new Promise((resolve, reject) => {
        const startMark = performance.now(); // Начало отсчета времени
        const readableStream = fs.createReadStream('input3.txt', { highWaterMark: sizeChunk });
        readableStream.on('data', () => {
            // Обрабатываем chunk
        });

        readableStream.on('end', () => {
            const endMark = performance.now(); // окончание отсчета времени
            const timeTaken = endMark - startMark;
            resolve(timeTaken); // Возвращаем время обработки
        });
        
        readableStream.on('error', (err) => {
            reject(err); // Обрабатываем ошибки
        })
    })
};