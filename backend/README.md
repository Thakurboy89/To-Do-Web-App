# Backend - To-Do Application API

## Overview
Node.js/Express backend API for the To-Do application with PostgreSQL database and JWT authentication.

## Quick Start

### Installation
```bash
npm install
```

### Configuration
Edit `.env` file:
```env
NODE_ENV=development
PORT=5000
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=change-this-key
FRONTEND_URL=http://localhost:3000
```

### Run Server
```bash
npm start
```

Server runs on `http://localhost:5000`

## Folder Structure

- **config/**: Database configuration
- **models/**: Sequelize ORM models
- **controllers/**: Request handlers
- **routes/**: API endpoints
- **middleware/**: Authentication & error handling
- **services/**: Business logic
- **utils/**: Utility functions
- **server.js**: Main application file

## Key Features

- JWT authentication
- Password hashing with bcryptjs
- PostgreSQL with Sequelize ORM
- RESTful API design
- Error handling middleware
- Input validation
- CORS configuration

## API Documentation

See main README.md for complete API endpoints and usage examples.
