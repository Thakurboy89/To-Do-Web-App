const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  boardId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [1, 255] }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('todo', 'in_progress', 'completed'),
    defaultValue: 'todo'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'todos',
  indexes: [
    { fields: ['board_id'] },
    { fields: ['user_id'] },
    { fields: ['board_id', 'status'] }
  ]
});

module.exports = Todo;
