const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Получить список всех книг
router.get('/', bookController.getAllBooks);

// Получить информацию о книге по id
router.get('/:id', bookController.getBookById);

// Создать новую книгу
router.post('/', bookController.createBook);

// Обновить информацию о книге по id
router.put('/:id', bookController.updateBook);

// Удалить книгу по id
router.delete('/:id', bookController.deleteBook);

module.exports = router;
