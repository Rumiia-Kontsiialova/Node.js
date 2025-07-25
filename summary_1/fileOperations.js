const fs = require('fs');
const path = require('path');

const imgPath = path.join(__dirname, 'example.jpg');
const newImgPath = path.join(__dirname, 'renameExample.jpg');
const copyFilePath = path.join(__dirname, 'copyOfExample.jpg');

// 1. Скопировать исходный файл
fs.copyFile(imgPath, copyFilePath, (copyErr) => {
    if (copyErr) {
        console.error('Ошибка при копировании файла:', copyErr);
        return;
    }
    console.log('Файл успешно скопирован как copyOfExample.jpg');

    // 2. Переименовать исходный файл
    fs.rename(imgPath, newImgPath, (renameErr) => {
        if (renameErr) {
            console.log("Ошибка при переименовании и перемещении:", renameErr);
            return;
        }
        console.log('Успешно переименовали и переместили файл');

        // 3. Удалить переименованный файл
        fs.unlink(newImgPath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Ошибка при удалении файла:', unlinkErr);
                return;
            }
            console.log('Файл успешно удалён');
        });
    });
});




// const fs = require('fs');
// const path = require('path');
// const imgPath = path.join(__dirname, 'image.jpg');
// const newImgPath = path.join(__dirname, 'newImage.jpg');
// const copyFilePath = path.join(__dirname, 'copyOfExample.jpg');
// fs.rename(imgPath, newImgPath, (err) => {
//   if (err) {
//     console.log('Ошибка при переименование и при перемещение: ', err);
//     return;
//   }
//   console.log('Успешно переименовали файл')
  
//   fs.copyFile(newImgPath, copyFilePath, (error) => {
//     if (error) {
//       console.error('Ошибка при копировании файла: ' + error);
//       return;
//     }
//     console.log('Файл успешно скопирован как copyOfExample.jpg');
//     fs.unlink(newImgPath, (error) => {
//       if (error) {
//         console.error(error);
//         return;
//       }
//       console.log('File was deleted');
//     })
//   })
// })