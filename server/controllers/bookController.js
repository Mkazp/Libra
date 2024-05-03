//bookController.js
const { Book } = require('../models/models');

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: API для управления книгами
 */

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Получить список всех книг
 *     description: Возвращает список всех книг из базы данных.
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: Список всех книг возвращен успешно.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /api/book/{id}:
 *   get:
 *     summary: Получить книгу по ID
 *     description: Возвращает детали книги по заданному ID.
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID книги
 *     responses:
 *       200:
 *         description: Книга найдена и возвращена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Книга не найдена.
 */

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Создать новую книгу
 *     description: Создает новую книгу с предоставленными деталями.
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Книга успешно создана.
 *       400:
 *         description: Неверный запрос, данные не обработаны.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: integer
 *           description: Идентификатор книги.
 *         title:
 *           type: string
 *           description: Название книги.
 *         author:
 *           type: string
 *           description: Автор книги.
 *         description:
 *           type: string
 *           description: Описание книги.
 */


/**
 * @swagger
 * /api/book/{id}:
 *   put:
 *     summary: Обновить книгу по ID
 *     description: Обновляет детали существующей книги по заданному ID.
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID книги
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Данные книги обновлены успешно.
 *       404:
 *         description: Книга не найдена.
 */

/**
 * @swagger
 * /api/book/{id}:
 *   delete:
 *     summary: Удалить книгу по ID
 *     description: Удаляет книгу по заданному ID.
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID книги
 *     responses:
 *       200:
 *         description: Книга успешно удалена.
 *       404:
 *         description: Книга не найдена.
 */


// Получить список всех книг
async function getAllBooks(req, res, next) {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

// Получить информацию о книге по id
async function getBookById(req, res, next) {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Книга не найдена' });
        }
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

// Создать новую книгу
async function createBook(req, res, next) {
    const { title, author, description } = req.body;
    try {
        const newBook = await Book.create({ title, author, description });
        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
}

// Обновить информацию о книге по id
async function updateBook(req, res, next) {
    const { id } = req.params;
    const { title, author, description } = req.body;
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Книга не найдена' });
        }
        book.title = title;
        book.author = author;
        book.description = description;
        await book.save();
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

// Удалить книгу по id
async function deleteBook(req, res, next) {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Книга не найдена' });
        }
        await book.destroy();
        res.status(200).json({ message: 'Книга успешно удалена' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
