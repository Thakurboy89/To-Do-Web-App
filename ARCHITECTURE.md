# Architecture & Design Document

## To-Do Application Architecture

### System Overview

This is a full-stack web application following a three-tier architecture:
1. **Presentation Layer** (React Frontend)
2. **Application Layer** (Node.js/Express Backend)
3. **Data Layer** (PostgreSQL Database)

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT SIDE (Port 3000)                     │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    React Application                       │ │
│  │  ┌──────────────┐      ┌──────────────┐                  │ │
│  │  │   Pages      │      │  Components  │                  │ │
│  │  │ - Login      │      │ - PrivateRte │                  │ │
│  │  │ - Register   │      │ - BoardCard  │                  │ │
│  │  │ - Dashboard  │      │ - TodoItem   │                  │ │
│  │  │ - Board      │      └──────────────┘                  │ │
│  │  │ - Profile    │                                         │ │
│  │  └──────────────┘                                         │ │
│  │                                                            │ │
│  │  ┌──────────────┐      ┌──────────────┐                  │ │
│  │  │  Context API │      │  Services    │                  │ │
│  │  │ - AuthContext│      │ - api.js     │                  │ │
│  │  └──────────────┘      └──────────────┘                  │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↕
                    (HTTP/REST API Calls)
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    SERVER SIDE (Port 5000)                       │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Express.js Application                        │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │              Routes (API Endpoints)                 │ │ │
│  │  │ - /api/auth        ├─→ authController              │ │ │
│  │  │ - /api/boards      ├─→ boardController             │ │ │
│  │  │ - /api/.../todos   ├─→ todoController              │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │            Controllers (Business Logic)              │ │ │
│  │  │ - Handle requests                                   │ │ │
│  │  │ - Call models/services                              │ │ │
│  │  │ - Return responses                                  │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │           Middleware                                 │ │ │
│  │  │ - Authentication (JWT)                              │ │ │
│  │  │ - Error handling                                    │ │ │
│  │  │ - CORS                                              │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │           Models (Sequelize ORM)                     │ │ │
│  │  │ - User                                              │ │ │
│  │  │ - Board                                             │ │ │
│  │  │ - Todo                                              │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │           Utilities                                  │ │ │
│  │  │ - auth.js (JWT, bcrypt, validation)                 │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↕
                      (SQL Queries)
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                  DATABASE (PostgreSQL)                           │
│                                                                   │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │
│  │   users     │   │   boards    │   │   todos     │           │
│  ├─────────────┤   ├─────────────┤   ├─────────────┤           │
│  │ id (PK)     │   │ id (PK)     │   │ id (PK)     │           │
│  │ email       │   │ userId (FK) │   │ boardId(FK) │           │
│  │ password    │   │ title       │   │ userId (FK) │           │
│  │ firstName   │   │ description │   │ title       │           │
│  │ lastName    │   │ color       │   │ description │           │
│  │ ...         │   │ ...         │   │ status      │           │
│  └─────────────┘   └─────────────┘   │ priority    │           │
│        ↑                 ↑             │ dueDate     │           │
│        └─────────────────┴─────────────│ ...         │           │
│          (Foreign Keys)                └─────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components Tree

```
App
├── Route: /login
│   └── Login (public)
├── Route: /register
│   └── Register (public)
├── Route: /dashboard
│   └── PrivateRoute
│       └── Dashboard
│           └── BoardCard[] (reusable)
├── Route: /board/:boardId
│   └── PrivateRoute
│       └── Board
│           └── TodoItem[] (reusable)
└── Route: /profile
    └── PrivateRoute
        └── Profile
```

### Backend Route Structure

```
/api
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── GET /profile (protected)
│   └── PATCH /profile (protected)
├── /boards (protected)
│   ├── POST / (create)
│   ├── GET / (list)
│   ├── GET /:boardId (detail with todos)
│   ├── PATCH /:boardId (update)
│   └── DELETE /:boardId (delete)
└── /boards/:boardId/todos (protected)
    ├── POST / (create)
    ├── GET / (list with filters)
    ├── GET /:todoId (detail)
    ├── PATCH /:todoId (update)
    └── DELETE /:todoId (delete)
```

## Data Flow

### User Registration & Authentication Flow

```
1. User fills registration form
   ↓
2. Frontend validates input
   ↓
3. POST /api/auth/register with email, password, name
   ↓
4. Backend validates input
   ↓
5. Backend hashes password with bcryptjs
   ↓
6. Backend creates User in database
   ↓
7. Backend generates JWT token
   ↓
8. Frontend receives token & user data
   ↓
9. Frontend stores token in localStorage
   ↓
10. Frontend stores user data in AuthContext
   ↓
11. Frontend redirects to /dashboard
```

### Todo Creation & Management Flow

```
1. User clicks "Add Todo" on a board
   ↓
2. Form appears with todo fields
   ↓
3. User fills and submits form
   ↓
4. POST /api/boards/:boardId/todos with JWT token
   ↓
5. Backend middleware verifies token
   ↓
6. Backend validates user owns the board
   ↓
7. Backend creates Todo in database
   ↓
8. Backend returns created todo
   ↓
9. Frontend updates local state
   ↓
10. UI re-renders showing new todo
```

## Security Measures

### Authentication
- **JWT Tokens**: Stateless authentication using JSON Web Tokens
- **Password Hashing**: bcryptjs with 10 salt rounds
- **Token Expiry**: 7 days (configurable)
- **Token Storage**: localStorage (frontend)

### Authorization
- **Protected Routes**: All board and todo routes require valid JWT
- **User Isolation**: Users can only access their own boards and todos
- **Middleware Protection**: authenticate middleware on protected routes

### Data Validation
- **Email Validation**: RFC-compliant email format check
- **Password Strength**: Min 8 chars, uppercase, lowercase, number
- **Input Sanitization**: Sequelize ORM prevents SQL injection
- **CORS Configuration**: Only allows requests from configured frontend URL

### Database Security
- **Prepared Statements**: Sequelize ORM uses parameterized queries
- **Foreign Keys**: Enforce referential integrity
- **Unique Constraints**: Prevent duplicate emails
- **Password Hashing**: Never store plain text passwords

## Performance Considerations

### Database Indexing
```sql
-- Created indexes for common queries
- users.email (unique)
- boards.userId
- todos.boardId
- todos.userId
- todos.status
```

### Query Optimization
- Eager loading of relationships
- Filtering at database level
- Pagination ready (can be implemented)

### Frontend Optimization
- Code splitting (React Router)
- Component memoization (potential)
- Lazy loading (potential)

## Error Handling

### Backend Error Flow
```
1. Request reaches route/controller
2. Controller performs action
3. If error:
   a. Sequelize validation error → 400 Bad Request
   b. Unique constraint error → 409 Conflict
   c. Not found → 404 Not Found
   d. Authentication error → 401 Unauthorized
   e. Server error → 500 Internal Server Error
4. Error middleware catches and formats response
5. Sends JSON error response to frontend
```

### Frontend Error Handling
```
1. API call made with axios
2. If error response:
   a. Extract error message from response
   b. Display error in UI
   c. Log for debugging
3. User sees user-friendly error message
```

## State Management

### Frontend State

#### Global State (Context API)
```javascript
AuthContext {
  user: { id, email, firstName, lastName },
  isAuthenticated: boolean,
  loading: boolean,
  error: string,
  login: function,
  logout: function
}
```

#### Local Component State
- Form inputs (useState)
- UI toggles (useState)
- Loading states (useState)
- Error messages (useState)

## Database Schema

### Users Table
- UUID primary key
- Unique email
- Hashed password
- Profile fields
- Timestamp tracking

### Boards Table
- UUID primary key
- Foreign key to users
- Title and description
- Color customization
- Timestamp tracking

### Todos Table
- UUID primary key
- Foreign keys to boards and users
- Status enum (todo, in_progress, completed)
- Priority enum (low, medium, high)
- Due date tracking
- Completion flag
- Timestamp tracking

## Deployment Considerations

### Frontend
- Build: `npm run build` creates optimized bundle
- Hosting: Vercel, Netlify, AWS S3 + CloudFront
- Environment: Update `REACT_APP_API_URL` for production

### Backend
- Build: Already production-ready
- Hosting: Heroku, AWS EC2, DigitalOcean
- Environment: Update `JWT_SECRET`, `DB_*`, `FRONTEND_URL`

### Database
- PostgreSQL hosting: AWS RDS, Heroku Postgres, DigitalOcean
- Backups: Enable automated backups
- Connection pooling: Use for production

## Testing Strategy

### Manual Testing
- User registration and login
- CRUD operations for boards
- CRUD operations for todos
- Filter and search functionality
- Error scenarios

### Automated Testing (Future)
- Unit tests for utilities
- Integration tests for API
- E2E tests for user flows

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation description",
  "data": { /* actual response */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [{ "field": "email", "message": "Already exists" }]
}
```

## Future Enhancements

1. **Real-time Updates**
   - WebSocket for live todo updates
   - Socket.io integration

2. **Advanced Features**
   - Task collaboration
   - Comments and attachments
   - Recurring tasks
   - Task templates

3. **Notifications**
   - Email notifications
   - In-app notifications
   - Reminder system

4. **Analytics**
   - Productivity tracking
   - Task completion rate
   - Time tracking

5. **Mobile App**
   - React Native version
   - Offline support
   - Push notifications

## Code Quality Standards

- **Naming**: Clear, descriptive names
- **Comments**: Documented complex logic
- **Structure**: MVC pattern followed
- **Error Handling**: Comprehensive error handling
- **Validation**: Input validation everywhere
- **Security**: Security best practices

## Development Workflow

### Backend Development
1. Define API endpoint in routes
2. Create controller function
3. Add database model logic
4. Add validation
5. Add error handling
6. Test with curl/Postman

### Frontend Development
1. Create page or component
2. Define component logic
3. Add styling
4. Integrate with API
5. Add loading states
6. Add error handling

## Environment Configuration

### Development
- Debug logging enabled
- CORS allows localhost:3000
- Database auto-syncs
- JWT secret is default

### Production
- Debug logging disabled
- CORS strict
- Database migrations
- Strong JWT secret
- HTTPS enforced
- Environment variables from secrets management

This architecture provides a scalable, secure, and maintainable foundation for the To-Do application.
