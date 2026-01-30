const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');

// Import all models and setup associations
const { User, Board, Todo } = require('./models');

const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/boards');
const todoRoutes = require('./routes/todos');
const { authenticate, errorHandler } = require('./middleware');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/boards', authenticate, boardRoutes);
app.use('/api/boards/:boardId/todos', authenticate, todoRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Database sync and server start
const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✓ Server is running on http://localhost:${PORT}`);
    console.log(`✓ Database connected`);
  });
}).catch(err => {
  console.error('✗ Database connection failed:', err.message);
  process.exit(1);
});

module.exports = app;
