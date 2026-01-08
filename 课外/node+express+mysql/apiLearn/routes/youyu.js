// routes/youyu.js
const express = require('express');
const router = express.Router();
const YouyuController = require('../controllers/youyuController');

// 路由定义
router.get('/', YouyuController.getAll);
router.get('/:id', YouyuController.getById);
router.post('/', YouyuController.create);
router.put('/:id', YouyuController.update);
router.delete('/:id', YouyuController.delete);

module.exports = router;