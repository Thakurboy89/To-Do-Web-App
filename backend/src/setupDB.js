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
    logging: false
  }
);

async function setupDatabase() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✓ Connected to PostgreSQL');

    // Sync all models (create tables if they don't exist, alter if they do)
    await sequelize.sync({ alter: true });
    console.log('✓ Database tables synced successfully');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
