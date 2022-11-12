const mysql = require('mysql2/promise'); 

const connection = mysql.createPool({ 
  host: process.env.MYSQL_HOST,
  port: 3307, 
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'StoreManager',
  multipleStatements: true,

});

module.exports = connection;