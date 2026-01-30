const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Board = sequelize.define('Board', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [1, 100] }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#3498db',
    validate: {
      is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    }
  }
}, {
  tableName: 'boards',
  indexes: [
    { fields: ['user_id'] },
    { fields: ['user_id', 'created_at'] }
  ]
});

module.exports = Board;
