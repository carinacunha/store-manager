const mysql = require('mysql2/promise'); 

const connection = mysql.createPool({ 
  host: 'localhost',
  port: 3307, 
  user: 'root',
  password: 'password',
  database: 'StoreManager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;