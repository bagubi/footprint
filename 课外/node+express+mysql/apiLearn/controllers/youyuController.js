//获取分类
// controllers/youyuController.js
const YouyuModel = require('../models/youyuModel');
const ResponseHandler = require('../util/responseHandler');

class YouyuController {
    // 获取所有记录
    static async getAll(req, res, next) {
        try {
            const data = await new Promise((resolve, reject) => {
                YouyuModel.getAll((err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            ResponseHandler.success(res, data, '查询成功');
        } catch (error) {
            ResponseHandler.error(res, error, '查询失败');
        }
    }

    // 根据ID获取记录
    static async getById(req, res, next) {
        try {
            const { id } = req.params;

            const data = await new Promise((resolve, reject) => {
                YouyuModel.getById(id, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            if (data.length === 0) {
                ResponseHandler.notFound(res, '未找到指定记录');
            } else {
                ResponseHandler.success(res, data[0], '查询成功');
            }
        } catch (error) {
            ResponseHandler.error(res, error, '查询失败');
        }
    }

    // 创建记录
    static async create(req, res, next) {
        try {
            const data = {
                id: req.body.id,
                category: req.body.category,
                status: req.body.status || 0,
                create_time: new Date()
            };

            const result = await new Promise((resolve, reject) => {
                YouyuModel.create(data, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            ResponseHandler.success(res, { id: result.insertId, ...data }, '创建成功', 201);
        } catch (error) {
            ResponseHandler.error(res, error, '创建失败');
        }
    }

    // 更新记录
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = {
                category: req.body.category,
                status: req.body.status
            };

            const result = await new Promise((resolve, reject) => {
                YouyuModel.update(id, data, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            if (result.affectedRows === 0) {
                ResponseHandler.notFound(res, '未找到指定记录');
            } else {
                ResponseHandler.success(res, null, '更新成功');
            }
        } catch (error) {
            ResponseHandler.error(res, error, '更新失败');
        }
    }

    // 删除记录
    static async delete(req, res, next) {
        try {
            const { id } = req.params;

            const result = await new Promise((resolve, reject) => {
                YouyuModel.delete(id, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            if (result.affectedRows === 0) {
                ResponseHandler.notFound(res, '未找到指定记录');
            } else {
                ResponseHandler.success(res, null, '删除成功');
            }
        } catch (error) {
            ResponseHandler.error(res, error, '删除失败');
        }
    }

    // 新增：获取文章列表，支持按分类筛选
    static async getArticles(req, res, next) {
        try {
            const { cate_id, type, page = 1, pageSize = 10 } = req.query;

            const filter = {};
            if (cate_id) filter.cate_id = cate_id;
            if (type) filter.type = type;
            if (page) filter.page = parseInt(page);
            if (pageSize) filter.pageSize = parseInt(pageSize);

            // 获取文章列表
            const articles = await new Promise((resolve, reject) => {
                YouyuModel.getArticles(filter, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            // 如果没有文章且有分类参数，返回空数组而不是notFound
            if (articles.length === 0 && (filter.cate_id || filter.type)) {
                ResponseHandler.success(res, {
                    list: [],
                    pagination: {
                        page: filter.page,
                        pageSize: filter.pageSize,
                        total: 0,
                        totalPages: 0
                    }
                }, '未找到符合条件的文章');
                return;
            }

            // 获取总数
            const countResult = await new Promise((resolve, reject) => {
                YouyuModel.getArticleCount(filter, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            const total = countResult[0].total;
            const totalPages = Math.ceil(total / filter.pageSize);

            ResponseHandler.success(res, {
                list: articles,
                pagination: {
                    page: filter.page,
                    pageSize: filter.pageSize,
                    total: total,
                    totalPages: totalPages
                }
            }, '获取文章列表成功');
        } catch (error) {
            ResponseHandler.error(res, error, '获取文章列表失败');
        }
    }
}

module.exports = YouyuController;