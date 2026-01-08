const mysql = require('mysql');

// 创建连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        // 用户名
    password: 'BAGUBI',  // 密码
    database: 'host',    // 数据库
    connectionLimit: 10, // 连接池最大连接数
    acquireTimeout: 60000, // 获取连接的超时时间
    timeout: 60000, // 查询超时时间
    reconnect: true // 是否重新连接
});

// 添加事件监听
pool.on('connection', (connection) => {
    console.log('数据库连接建立，连接ID: ' + connection.threadId);
});

pool.on('error', (err) => {
    console.error('数据库连接池错误: ' + err);
});

module.exports = pool;