const express = require('express');
const router = express.Router();
const { createBoard, getBoards, getBoardById, updateBoard, deleteBoard } = require('../controllers/boardController');

router.post('/', createBoard);
router.get('/', getBoards);
router.get('/:boardId', getBoardById);
router.patch('/:boardId', updateBoard);
router.delete('/:boardId', deleteBoard);

module.exports = router;
