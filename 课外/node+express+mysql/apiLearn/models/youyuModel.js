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

    // 新增：获取文章列表，支持按分类筛选
    static getArticles(filter, callback) {
        let sql = 'SELECT id, title, pic, `desc`, cate_id, type, create_time FROM articles WHERE 1=1';
        const sqlArr = [];

        // 如果有分类过滤条件
        if (filter.cate_id) {
            sql += ' AND cate_id = ?';
            sqlArr.push(filter.cate_id);
        }

        // 如果有其他过滤条件（如类型）
        if (filter.type) {
            sql += ' AND type = ?';
            sqlArr.push(filter.type);
        }

        // 分页处理
        if (filter.page && filter.pageSize) {
            const offset = (filter.page - 1) * filter.pageSize;
            sql += ' LIMIT ?, ?';
            sqlArr.push(offset);
            sqlArr.push(parseInt(filter.pageSize));
        }

        dbConfig.query(sql, sqlArr, callback);
    }

    // 新增：获取文章总数（用于分页计算）
    static getArticleCount(filter, callback) {
        let sql = 'SELECT COUNT(*) as total FROM articles WHERE 1=1';
        const sqlArr = [];

        if (filter.cate_id) {
            sql += ' AND cate_id = ?';
            sqlArr.push(filter.cate_id);
        }

        if (filter.type) {
            sql += ' AND type = ?';
            sqlArr.push(filter.type);
        }

        dbConfig.query(sql, sqlArr, callback);
    }
}

module.exports = YouyuModel;