const Board = require('../models/Board');
const Todo = require('../models/Todo');

const createBoard = async (req, res, next) => {
  try {
    const { title, description, color } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Board title is required'
      });
    }

    const board = await Board.create({
      userId: req.userId,
      title,
      description,
      color: color || '#3498db'
    });

    res.status(201).json({
      success: true,
      message: 'Board created successfully',
      data: board
    });
  } catch (error) {
    next(error);
  }
};

const getBoards = async (req, res, next) => {
  try {
    const boards = await Board.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: boards
    });
  } catch (error) {
    next(error);
  }
};

const getBoardById = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findByPk(boardId, {
      include: [{ model: Todo }]
    });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Board not found'
      });
    }

    if (board.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to this board'
      });
    }

    res.json({
      success: true,
      data: board
    });
  } catch (error) {
    next(error);
  }
};

const updateBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, description, color } = req.body;
    const board = await Board.findByPk(boardId);

    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Board not found'
      });
    }

    if (board.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to this board'
      });
    }

    if (title) board.title = title;
    if (description) board.description = description;
    if (color) board.color = color;

    await board.save();

    res.json({
      success: true,
      message: 'Board updated successfully',
      data: board
    });
  } catch (error) {
    next(error);
  }
};

const deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findByPk(boardId);

    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Board not found'
      });
    }

    if (board.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to this board'
      });
    }

    await board.destroy();

    res.json({
      success: true,
      message: 'Board deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBoard, getBoards, getBoardById, updateBoard, deleteBoard };
