const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// 获取所有书籍
router.get('/', bookController.getAllBooks);

// 添加新书籍
router.post('/', bookController.createBook);

module.exports = router;
