# To-Do Web Application

A full-stack task management application built with React, Node.js, Express, and PostgreSQL.

## Features

- **User Authentication**: Email-based authentication with JWT tokens
- **Board Management**: Create, read, update, and delete boards
- **Todo Management**: CRUD operations on todos within boards
- **Task Filtering**: Filter todos by status (To Do, In Progress, Completed) and priority
- **Responsive Design**: Mobile-friendly UI with modern styling
- **User Profiles**: Manage user information

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT + bcryptjs
- **Validation**: Built-in validation

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 with modern features

## Project Structure

```
To-Do Project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── boardController.js
│   │   │   └── todoController.js
│   │   ├── middleware/
│   │   │   └── index.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Board.js
│   │   │   └── Todo.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── boards.js
│   │   │   └── todos.js
│   │   ├── services/
│   │   ├── utils/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── PrivateRoute.js
    │   │   ├── BoardCard.js
    │   │   └── TodoItem.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   └── Board.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── index.css
    │   │   ├── auth.css
    │   │   ├── dashboard.css
    │   │   ├── boardCard.css
    │   │   ├── board.css
    │   │   └── todoItem.css
    │   ├── utils/
    │   ├── App.js
    │   └── index.js
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── .env
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- PostgreSQL (running locally)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the database in `.env`:
```env
NODE_ENV=development
PORT=5000
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
```

4. Create PostgreSQL database:
```sql
CREATE DATABASE todo_db;
```

5. Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API URL in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The app will open on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PATCH /api/auth/profile` - Update user profile (protected)

### Boards
- `POST /api/boards` - Create a board (protected)
- `GET /api/boards` - Get all user boards (protected)
- `GET /api/boards/:boardId` - Get board with todos (protected)
- `PATCH /api/boards/:boardId` - Update board (protected)
- `DELETE /api/boards/:boardId` - Delete board (protected)

### Todos
- `POST /api/boards/:boardId/todos` - Create todo (protected)
- `GET /api/boards/:boardId/todos` - Get board todos (protected)
- `GET /api/boards/:boardId/todos/:todoId` - Get single todo (protected)
- `PATCH /api/boards/:boardId/todos/:todoId` - Update todo (protected)
- `DELETE /api/boards/:boardId/todos/:todoId` - Delete todo (protected)

## Database Schema

### Users Table
- `id` (UUID, PK)
- `email` (String, unique)
- `password` (String, hashed)
- `firstName` (String)
- `lastName` (String)
- `emailVerified` (Boolean)
- `lastLogin` (DateTime)
- `createdAt`, `updatedAt`

### Boards Table
- `id` (UUID, PK)
- `userId` (UUID, FK)
- `title` (String)
- `description` (Text)
- `color` (String)
- `createdAt`, `updatedAt`

### Todos Table
- `id` (UUID, PK)
- `boardId` (UUID, FK)
- `userId` (UUID, FK)
- `title` (String)
- `description` (Text)
- `status` (ENUM: todo, in_progress, completed)
- `priority` (ENUM: low, medium, high)
- `completed` (Boolean)
- `dueDate` (DateTime)
- `createdAt`, `updatedAt`

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## Features in Detail

### Authentication
- Secure password hashing with bcryptjs
- JWT-based stateless authentication
- Protected routes and API endpoints

### Task Management
- Create multiple boards for organization
- Create, read, update, delete todos
- Assign priority levels (Low, Medium, High)
- Set due dates for tasks
- Mark tasks as completed
- Filter tasks by status

### User Experience
- Responsive design for desktop and mobile
- Intuitive UI with modern styling
- Real-time form validation
- Loading states and error handling
- Empty state messages

## Development Notes

### Code Organization
- Separation of concerns with controllers, models, and routes
- Reusable React components
- Context API for state management
- Service layer for API calls

### Best Practices
- Error handling middleware
- Input validation
- SQL injection prevention (via ORM)
- CORS configuration
- Environment-based configuration

## Future Enhancements

- [ ] Firebase integration for email verification
- [ ] Real-time updates with WebSocket
- [ ] User roles and permissions
- [ ] Task collaboration and sharing
- [ ] Email notifications
- [ ] Dark mode theme
- [ ] Task templates
- [ ] Recurring tasks
- [ ] File attachments

## Testing

To test the API endpoints, use Postman or curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Pass123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Pass123456"}'
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify credentials in `.env`
- Check database exists

### CORS Errors
- Ensure `FRONTEND_URL` is correct in backend `.env`
- Frontend and backend are on correct ports

### Port Already in Use
- Change `PORT` in `.env` for backend (default 5000)
- Change port for frontend (default 3000)

## License

This project is created for educational purposes.

## Contributing

Feel free to submit issues and enhancement requests!
