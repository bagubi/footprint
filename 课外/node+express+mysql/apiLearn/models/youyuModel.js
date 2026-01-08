// models/youyuModel.js
const dbConfig = require('../util/dbconfig');

class YouyuModel {
    // 查询所有记录
    static getAll(callback) {
        const sql = 'SELECT id, category FROM youyu';
        const sqlArr = [];

        dbConfig.query(sql, sqlArr, callback);
    }

    // 根据ID查询记录
    static getById(id, callback) {
        const sql = 'SELECT id, category FROM youyu WHERE id = ?';
        const sqlArr = [id];

        dbConfig.query(sql, sqlArr, callback);
    }

    // 创建新记录
    static create(data, callback) {
        const sql = 'INSERT INTO youyu (id, category, status, create_time) VALUES (?, ?, ?, ?)';
        const sqlArr = [data.id, data.category, data.status, data.create_time];

        dbConfig.query(sql, sqlArr, callback);
    }

    // 更新记录
    static update(id, data, callback) {
        const sql = 'UPDATE youyu SET category = ?, status = ? WHERE id = ?';
        const sqlArr = [data.category, data.status, id];

        dbConfig.query(sql, sqlArr, callback);
    }

    // 删除记录
    static delete(id, callback) {
        const sql = 'DELETE FROM youyu WHERE id = ?';
        const sqlArr = [id];

        dbConfig.query(sql, sqlArr, callback);
    }
}

module.exports = YouyuModel;