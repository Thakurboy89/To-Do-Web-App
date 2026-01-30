const Todo = require('../models/Todo');
const Board = require('../models/Board');

const createTodo = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, description, priority, dueDate } = req.body;

    const board = await Board.findByPk(boardId);
    if (!board || board.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Board not found or unauthorized'
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Todo title is required'
      });
    }

    const todo = await Todo.create({
      boardId,
      userId: req.userId,
      title,
      description,
      priority: priority || 'medium',
      dueDate
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

const getTodos = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { status, priority } = req.query;

    const board = await Board.findByPk(boardId);
    if (!board || board.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Board not found or unauthorized'
      });
    }

    const where = { boardId };
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const todos = await Todo.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: todos
    });
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const { boardId, todoId } = req.params;
    const todo = await Todo.findByPk(todoId);

    if (!todo || todo.boardId !== boardId || todo.userId !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { boardId, todoId } = req.params;
    const { title, description, status, priority, dueDate, completed } = req.body;

    const todo = await Todo.findByPk(todoId);
    if (!todo || todo.boardId !== boardId || todo.userId !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    if (title) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (status) todo.status = status;
    if (priority) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();

    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { boardId, todoId } = req.params;
    const todo = await Todo.findByPk(todoId);

    if (!todo || todo.boardId !== boardId || todo.userId !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    await todo.destroy();

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
