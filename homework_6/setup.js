import { db } from './config/db.js';

// SQL для создания таблицы
const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL
)
`;

db.query(createProductsTable, (err, result) => {
  if (err) {
    console.error('Error creating table: ', err);
  } else {
    console.log('Table products created');
  }
  db.end(); // закрываем соединение
});
