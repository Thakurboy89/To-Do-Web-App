const express = require('express');
const router = express.Router({ mergeParams: true });
const { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } = require('../controllers/todoController');

router.post('/', createTodo);
router.get('/', getTodos);
router.get('/:todoId', getTodoById);
router.patch('/:todoId', updateTodo);
router.delete('/:todoId', deleteTodo);

module.exports = router;
