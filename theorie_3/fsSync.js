const fs = require('fs');

    try{
        const content = fs.readFileSync('inputSync.txt', 'utf8');
        console.log('Data from file inputSync.txt: ', content);  //выводится первым

        fs.writeFileSync('outputSync.txt', content, 'utf8');
        console.log('The file is recorded'); // выводится вторым

    } catch (err) {
        console.error(err)
    }

    console.log('test') // выводится тертьим