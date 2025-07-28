const fs = require('fs');
require('dotenv').config();

const env = process.env.FILENAME;

const content = 'Text that will be written to the file';

fs.writeFile(env, content, (err) => {
    if (err) {
        console.error('Error writing file', err);
        return;
    }
    console.log(`File "${env}" was successfully created and written.`);

    fs.readFile(env, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('\nFile contents:');
        console.log(data);
    })
})