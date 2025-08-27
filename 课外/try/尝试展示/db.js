// db.js
const mysql = require('mysql2');

// 创建连接池（比单一连接更好）
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'BAGUBI',
  database: 'your_database_name', // 请改为你实际的数据库名
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 直接导出promise版本的pool
const promisePool = pool.promise();

module.exports = promisePool;