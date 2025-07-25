const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) {
        console.error('Error message: ', err);  // у нас записано конкантенация, можно сделать тоже самое интерполяцией console.error(`Error message: ${err}`);
        return;
    }
    console.log(`File contents: ${data}`);  // запустится второй

fs.writeFile('output.txt', data, 'utf8', (err) => {
    if(err) {
        console.error('Error message: ', err);  // у нас записано конкантенация, можно сделать тоже самое интерполяцией console.error(`Error message: ${err}`);
        return
    }
    console.log('The file is recorded'); // запустится третий
});

})
console.log('test')  // запустится первая

