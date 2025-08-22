import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1',
    database: 'product_db'
});

db.connect((error) => {
    if(error) {
        console.error('Database connection error:', error);
    } else {
        console.log('Connected to MySQL database is successfully');
        
    }
})