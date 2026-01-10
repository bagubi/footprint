// routes/youyu.js
const express = require('express');
const router = express.Router();
const YouyuController = require('../controllers/youyuController');

// 具体路由优先：先定义明确的路径
// 获取所有 youyu 记录
router.get('/', YouyuController.getAll);//GET http://localhost:3000/api/youyu/
router.get('/articles', YouyuController.getArticles);

// 通配符路由最后：参数化的路由放在后面
// 根据 ID 获取 youyu 记录
router.get('/:id', YouyuController.getById);
// 创建新记录
router.post('/', YouyuController.create);
// 更新记录
router.put('/:id', YouyuController.update);
// 删除记录
router.delete('/:id', YouyuController.delete);

module.exports = router;