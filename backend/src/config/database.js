const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'todo_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '1234',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscored: true  // Convert camelCase to snake_case
    }
  }
);

sequelize.authenticate()
  .then(() => console.log('✓ Database connection successful'))
  .catch(err => console.error('✗ Database connection error:', err.message));

module.exports = {
  sequelize,
  Sequelize
};
