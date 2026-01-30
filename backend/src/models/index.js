const User = require('./User');
const Board = require('./Board');
const Todo = require('./Todo');

// Setup associations
Board.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Board, { foreignKey: 'userId' });

Todo.belongsTo(Board, { foreignKey: 'boardId', onDelete: 'CASCADE' });
Todo.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Board.hasMany(Todo, { foreignKey: 'boardId' });
User.hasMany(Todo, { foreignKey: 'userId' });

module.exports = { User, Board, Todo };
