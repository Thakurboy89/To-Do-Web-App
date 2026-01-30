# Getting Started with To-Do Application

## Prerequisites
- Node.js v14 or higher
- npm or yarn
- PostgreSQL 12 or higher
- Git

## Installation Steps

### Step 1: Clone/Setup the Project
```bash
cd "C:\Users\thaku\OneDrive\Desktop\To-Do Project"
```

### Step 2: Database Setup

1. **Create PostgreSQL Database**
   ```sql
   CREATE DATABASE todo_db;
   ```

   Or using command line:
   ```bash
   createdb todo_db
   ```

2. **Verify Connection**
   Make sure PostgreSQL is running and accessible with the credentials in `.env`

### Step 3: Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update .env file**
   ```env
   NODE_ENV=development
   PORT=5000
   DB_NAME=todo_db
   DB_USER=postgres
   DB_PASSWORD=1234
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start backend server**
   ```bash
   npm start
   ```

   You should see:
   ```
   ✓ Database models synchronized
   ✓ Server is running on http://localhost:5000
   ✓ Environment: development
   ```

### Step 4: Frontend Setup

1. **Navigate to frontend** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update .env file**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start frontend development server**
   ```bash
   npm start
   ```

   The browser should automatically open to `http://localhost:3000`

## Testing the Application

### 1. Register a New User
- Go to http://localhost:3000/register
- Fill in the form:
  - Email: `test@example.com`
  - Password: `TestPass123` (must have uppercase, lowercase, number)
  - First Name: `John`
  - Last Name: `Doe`
- Click Register

### 2. Create a Board
- Click "New Board" button
- Fill in:
  - Title: "My First Project"
  - Description: "Testing the app"
  - Color: Choose a color
- Click "Create Board"

### 3. Create a Todo
- Click on a board
- Click "Add Todo"
- Fill in:
  - Title: "Complete setup"
  - Priority: "High"
  - Due Date: Tomorrow's date
  - Description: "Finish setting up the app"
- Click "Create Todo"

### 4. Manage Todos
- Click on a todo to expand it
- Click "Edit" to modify the todo
- Change status, priority, or description
- Click "Delete" to remove a todo
- Use filter buttons to view todos by status

### 5. Manage Boards
- View all boards in dashboard
- Click "×" to delete a board
- Click on a board card to view todos

## API Testing with curl

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user@example.com\",\"password\":\"Pass123456\",\"firstName\":\"John\",\"lastName\":\"Doe\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user@example.com\",\"password\":\"Pass123456\"}"
```

The response will include a token. Use it for subsequent requests:

### Create a Board (replace TOKEN with actual token)
```bash
curl -X POST http://localhost:5000/api/boards \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d "{\"title\":\"My Board\",\"description\":\"Test\",\"color\":\"#3498db\"}"
```

## Troubleshooting

### Backend won't start
- **Error**: "connect ECONNREFUSED 127.0.0.1:5432"
  - Solution: PostgreSQL is not running. Start PostgreSQL service.

- **Error**: "database todo_db does not exist"
  - Solution: Create the database using the command above.

### Frontend can't reach backend
- **Error**: "Network Error" or CORS issues
  - Solution: Make sure backend is running on port 5000
  - Check `FRONTEND_URL` in backend `.env`
  - Check `REACT_APP_API_URL` in frontend `.env`

### Port already in use
- Backend (5000): Change `PORT` in `.env`
- Frontend (3000): Use `PORT=3001 npm start`

### Password validation errors
- Password must be at least 8 characters
- Must contain uppercase letter (A-Z)
- Must contain lowercase letter (a-z)
- Must contain a number (0-9)
- Example: `MyPass123`

## Development Tips

### Using the React DevTools
- Install React DevTools browser extension
- Can inspect component hierarchy and state

### Backend Logs
- Check terminal for request logs
- Look for errors in backend console

### API Response Format
All API responses follow this format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Project Features Checklist

- ✅ User Registration with validation
- ✅ User Login with JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected API routes
- ✅ Create Boards
- ✅ Read/View Boards
- ✅ Update Boards
- ✅ Delete Boards with todos
- ✅ Create Todos
- ✅ Read/View Todos
- ✅ Update Todos
- ✅ Delete Todos
- ✅ Filter todos by status
- ✅ Task priority levels
- ✅ Due date tracking
- ✅ Responsive UI
- ✅ Error handling
- ✅ Form validation

## Next Steps

### Optional Enhancements
1. **Email Verification** - Integrate with Firebase/Nodemailer
2. **WebSocket Support** - Real-time todo updates
3. **Task Tags** - Categorize todos
4. **Recurring Tasks** - Auto-generate todos
5. **File Uploads** - Attach files to todos
6. **Sharing** - Share boards with others

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the error message carefully
3. Check backend logs for detailed errors
4. Verify all `.env` files are configured correctly
5. Ensure PostgreSQL is running

Enjoy using the To-Do Application!
