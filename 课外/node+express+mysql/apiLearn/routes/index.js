// routes/index.js
const express = require('express');
const router = express.Router();
const ResponseHandler = require('../util/responseHandler');

// 健康检查和其他通用路由
router.get('/', (req, res) => {
  res.send('API 服务器正在运行');
});

router.get('/health', (req, res) => {
  ResponseHandler.success(res, {
    timestamp: new Date().toISOString(),
    status: 'healthy'
  }, '服务正常运行');
});

module.exports = router;