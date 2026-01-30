# COMPLETE SETUP & CONFIGURATION GUIDE

##  Quick Start (5 Minutes)

### Prerequisites Check
- ✅ Node.js installed
- ✅ PostgreSQL installed and running
- ✅ npm available

### Step 1: Backend Setup (3 minutes)
```bash
# Terminal 1
cd "C:\Users\thaku\OneDrive\Desktop\To-Do Project\backend"
npm install          # If not already done
node src/setupDB.js  # Initialize database
npm start            # Start server on port 5000
```

**Expected Output:**
```
✓ Database connection successful
✓ Database tables synced successfully
✓ Server is running on http://localhost:5000
✓ Database connected
```

### Step 2: Frontend Setup (2 minutes)
```bash
# Terminal 2
cd "C:\Users\thaku\OneDrive\Desktop\To-Do Project\frontend"
npm install          # If not already done
npm start            # Start React app on port 3000
```

**Expected Output:**
```
Compiled with warnings.
webpack compiled with X warning
```

### Step 3: Access Application
```
Open browser: http://localhost:3000
```

---

## 📁 FOLDER ORGANIZATION

```
To-Do Project/
│
├── 📂 backend/                    ← Node.js + Express API
│   ├── src/                       ← Source code
│   │   ├── config/                ← Database config
│   │   ├── controllers/           ← Business logic
│   │   ├── middleware/            ← Auth & error handling
│   │   ├── models/                ← Database models
│   │   ├── routes/                ← API routes
│   │   ├── utils/                 ← Helper functions
│   │   ├── server.js              ← Main app
│   │   └── setupDB.js             ← DB setup
│   ├── .env                       ← Configuration (DO NOT SHARE)
│   ├── .env.example               ← Template (safe to share)
│   ├── package.json               ← Dependencies
│   └── README.md                  ← Backend docs
│
├── 📂 frontend/                   ← React.js App
│   ├── src/                       ← Source code
│   │   ├── components/            ← Reusable components
│   │   ├── pages/                 ← Page components
│   │   ├── context/               ← State management
│   │   ├── services/              ← API client
│   │   ├── styles/                ← CSS files
│   │   ├── App.js                 ← Main component
│   │   └── index.js               ← Entry point
│   ├── public/                    ← Static files
│   ├── .env                       ← Configuration
│   ├── .env.example               ← Template
│   ├── package.json               ← Dependencies
│   └── README.md                  ← Frontend docs
│
├── 📄 README.md                   ← Main project overview
├── 📄 SETUP.md                    ← Detailed setup guide
├── 📄 ARCHITECTURE.md             ← System design
├── 📄 GIT_WORKFLOW.md             ← Git strategy
├── 📄 QUICK_TEST_GUIDE.md         ← Testing instructions
├── 📄 IMPLEMENTATION_SUMMARY.md    ← Feature list
├── 📄 PROJECT_STRUCTURE_VERIFICATION.md ← File structure
├── 📄 .gitignore                  ← Git ignore rules
└── 🔒 node_modules/               ← Installed packages (don't share)
```

---

## ✅ ENVIRONMENT CONFIGURATION

### Backend (.env)
**Located:** `backend/.env`

**Required Variables:**
```
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

**For Production:**
- Change `JWT_SECRET` to a strong random key
- Update `DB_PASSWORD` to secure password
- Change `DB_HOST` to your production database
- Set `NODE_ENV=production`
- Update `FRONTEND_URL` to production domain

### Frontend (.env)
**Located:** `frontend/.env`

**Required Variables:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

**For Production:**
- Change to production API URL
- Example: `REACT_APP_API_URL=https://api.yourdomain.com/api`

---

## 🗄️ DATABASE SETUP

### Automatic Setup (Recommended)
```bash
cd backend
node src/setupDB.js
```

This will:
1. ✅ Connect to PostgreSQL
2. ✅ Create `todo_db` database if not exists
3. ✅ Create all tables (users, boards, todos)
4. ✅ Set up relationships and indexes
5. ✅ Enable cascade deletes

### Manual Setup (if needed)
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE todo_db;

# Exit psql
\q

# Then run
cd backend
npm start
```

---

##  SECURITY CHECKLIST

### Before Production Deployment
- ✅ Change JWT_SECRET to random strong key
- ✅ Set NODE_ENV=production
- ✅ Update database credentials
- ✅ Enable HTTPS/SSL
- ✅ Set secure CORS origin
- ✅ Update password requirements if needed
- ✅ Set up database backups
- ✅ Configure environment variables on server

### Development Security
- ✅ Never commit .env file (in .gitignore)
- ✅ Use strong JWT_SECRET
- ✅ Validate all inputs
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated

---

## FILE CHECKLIST

### Backend Files to Verify
```
backend/
├── src/
│   ├── config/database.js           ✅ Sequelize config
│   ├── models/User.js               ✅ User model
│   ├── models/Board.js              ✅ Board model
│   ├── models/Todo.js               ✅ Todo model
│   ├── models/index.js              ✅ Associations
│   ├── controllers/authController.js ✅ Auth logic
│   ├── controllers/boardController.js ✅ Board CRUD
│   ├── controllers/todoController.js ✅ Todo CRUD
│   ├── routes/auth.js               ✅ Auth routes
│   ├── routes/boards.js             ✅ Board routes
│   ├── routes/todos.js              ✅ Todo routes
│   ├── middleware/index.js          ✅ Middleware
│   ├── utils/auth.js                ✅ JWT & bcrypt
│   ├── server.js                    ✅ Express app
│   └── setupDB.js                   ✅ DB setup
├── .env                             ✅ Configuration
├── .env.example                     ✅ Template
├── package.json                     ✅ Dependencies
└── README.md                        ✅ Documentation
```

### Frontend Files to Verify
```
frontend/src/
├── pages/Login.js                   ✅ Login page
├── pages/Register.js                ✅ Register page
├── pages/Dashboard.js               ✅ Dashboard
├── pages/Board.js                   ✅ Board page
├── pages/Profile.js                 ✅ Profile page
├── components/PrivateRoute.js       ✅ Route guard
├── components/BoardCard.js          ✅ Board card
├── components/TodoItem.js           ✅ Todo item
├── context/AuthContext.js           ✅ Auth state
├── services/api.js                  ✅ API client
├── styles/index.css                 ✅ Global styles
├── styles/auth.css                  ✅ Auth styles
├── styles/dashboard.css             ✅ Dashboard styles
├── styles/board.css                 ✅ Board styles
├── styles/boardCard.css             ✅ Card styles
├── styles/todoItem.css              ✅ Todo styles
├── styles/profile.css               ✅ Profile styles
├── App.js                           ✅ Main app
└── index.js                         ✅ Entry point
```

---

## 🧪 TESTING WORKFLOW

### Test 1: User Registration
```
1. Go to http://localhost:3000
2. Click "Register"
3. Fill in:
   Email: test@example.com
   Password: TestPassword123
   First Name: John
   Last Name: Doe
4. Click Register
```

**Expected Result:** ✅ User created, logged in, redirected to dashboard

### Test 2: Create Board
```
1. On Dashboard, fill board form:
   Title: My First Board
   Description: Test board
   Color: #3498db (blue)
2. Click "Create Board"
```

**Expected Result:** ✅ Board appears in dashboard

### Test 3: Create Todo
```
1. Click on board
2. Fill todo form:
   Title: Complete documentation
   Priority: High
   Due Date: 2026-02-15
3. Click "Add Todo"
```

**Expected Result:** ✅ Todo appears in list

### Test 4: Filter Todos
```
1. Click "In Progress" button
2. Create another todo with status "in_progress"
3. Verify filtering works
```

**Expected Result:** ✅ Only "in_progress" todos show

### Test 5: Update Todo
```
1. Click on todo to expand
2. Click Edit
3. Change status to "completed"
4. Click Save
```

**Expected Result:** ✅ Todo updates

### Test 6: Delete Todo
```
1. Click Delete button on a todo
2. Confirm deletion
```

**Expected Result:** ✅ Todo removed from list

### Test 7: Profile Management
```
1. Click your email in top-right
2. Change First Name or Last Name
3. Click "Update Profile"
```

**Expected Result:** ✅ Profile updates

### Test 8: Logout & Login
```
1. Click Logout
2. You're redirected to login
3. Login with same credentials
```

**Expected Result:** ✅ Successfully logged back in

---

## 🐛 TROUBLESHOOTING

### Backend Issues

**Error: "Database connection failed"**
- ✅ Ensure PostgreSQL is running
- ✅ Check .env credentials are correct
- ✅ Run: `node src/setupDB.js`

**Error: "Port 5000 already in use"**
- ✅ Change PORT in .env
- ✅ Or kill process: `npx kill-port 5000`

**Error: "Module not found"**
- ✅ Run: `npm install`
- ✅ Delete `node_modules` and reinstall

### Frontend Issues

**Error: "Cannot reach API"**
- ✅ Ensure backend is running on port 5000
- ✅ Check REACT_APP_API_URL in .env

**Error: "Port 3000 already in use"**
- ✅ Kill process: `npx kill-port 3000`
- ✅ Or start on different port

**Error: "Login page not loading"**
- ✅ Clear browser cache: Ctrl+Shift+Delete
- ✅ Clear localStorage: F12 → Application → Clear

### Database Issues

**Error: "Column does not exist"**
- ✅ Run: `node src/setupDB.js`
- ✅ This syncs the schema

**Error: "Duplicate key value"**
- ✅ Database already has this record
- ✅ Use different email for new user

---

## 📱 RESPONSIVE TESTING

### Desktop View
```
Screen: 1920px × 1080px
Status: Full layout with all features
```

### Tablet View
```
Screen: 768px × 1024px
Status: Responsive layout
Test: All buttons clickable, forms work
```

### Mobile View
```
Screen: 375px × 667px
Status: Optimized mobile layout
Test: Single column, touch-friendly
```

---

## 🚀 DEPLOYMENT CHECKLIST

### Before Going Live

**Backend Deployment:**
- ✅ Set NODE_ENV=production
- ✅ Update JWT_SECRET (use strong random key)
- ✅ Update database credentials
- ✅ Set CORS_ORIGIN to production domain
- ✅ Enable HTTPS
- ✅ Set up database backups
- ✅ Configure error logging
- ✅ Set up monitoring/alerts

**Frontend Deployment:**
- ✅ Update REACT_APP_API_URL to production API
- ✅ Run build: `npm run build`
- ✅ Test production build locally
- ✅ Deploy to Vercel/Netlify/S3
- ✅ Set up CDN for assets
- ✅ Configure caching headers

**Database Deployment:**
- ✅ Set up PostgreSQL on production server
- ✅ Run migrations
- ✅ Set up regular backups
- ✅ Configure monitoring
- ✅ Set up replication (optional)

### Deployment Platforms

**Frontend:**
- Vercel (recommended for Next.js, but works with React)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

**Backend:**
- Heroku (easiest for beginners)
- AWS EC2
- DigitalOcean
- Railway
- Render

**Database:**
- AWS RDS
- Heroku Postgres
- DigitalOcean Managed Database
- Cloud SQL (Google Cloud)

---

## 📚 DOCUMENTATION MAP

| Document | Purpose | Location |
|----------|---------|----------|
| **README.md** | Project overview | Root directory |
| **SETUP.md** | Installation guide | Root directory |
| **ARCHITECTURE.md** | System design | Root directory |
| **GIT_WORKFLOW.md** | Git conventions | Root directory |
| **QUICK_TEST_GUIDE.md** | Testing steps | Root directory |
| **IMPLEMENTATION_SUMMARY.md** | Feature list | Root directory |
| **PROJECT_STRUCTURE_VERIFICATION.md** | File structure | Root directory |
| **Backend README.md** | Backend docs | `backend/` |
| **Frontend README.md** | Frontend docs | `frontend/` |
| **THIS FILE** | Setup instructions | (You're reading this) |

---

## 🔄 DAILY DEVELOPMENT WORKFLOW

### Morning - Start Development
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start

# Terminal 3 - Optional (Git operations)
git status
```

### During Development
- Make changes to code
- Test in browser (http://localhost:3000)
- Check browser console for errors (F12)
- Check terminal for server errors

### Before Committing
```bash
# Test the application manually
# Then commit changes
git add .
git commit -m "type(scope): description"
git push
```

### End of Day
- Close terminals with Ctrl+C
- Commit your work
- Push to repository

---

## 💾 QUICK COMMAND REFERENCE

```bash
# Start Backend
cd backend && npm start

# Start Frontend
cd frontend && npm start

# Initialize Database
cd backend && node src/setupDB.js

# Install Dependencies
npm install

# View Logs
# Check terminal output or browser console (F12)

# Stop Server
Ctrl + C (in terminal)

# Clean Install
rm -r node_modules package-lock.json
npm install
```

---

## 🎯 SUCCESS INDICATORS

### ✅ Backend Ready
- Server running on port 5000
- No console errors
- Database connected
- "Database connected" message shows

### ✅ Frontend Ready
- App running on port 3000
- Compiled successfully message
- No red errors in console
- Login page displays

### ✅ Full Stack Working
- Can register new user
- Can login
- Can create board
- Can create todo
- Can filter and update
- Can logout

---

## 📞 COMMON QUESTIONS

**Q: Where do I change the port?**
A: Backend: `.env` file, change `PORT=5000`
   Frontend: Automatic on 3000, or set in terminal

**Q: How do I reset the database?**
A: Run `node src/setupDB.js` (it syncs the schema)
   Or manually drop and recreate the database

**Q: How do I change the password requirements?**
A: `backend/src/utils/auth.js` → `isValidPassword()` function

**Q: How do I change the JWT expiry time?**
A: `backend/src/utils/auth.js` → `generateToken()` function
   Current: 7 days, change `expiresIn: '7d'`

**Q: Where are user passwords stored?**
A: PostgreSQL `users` table, `password` column (hashed)

**Q: How do I backup the database?**
A: Use PostgreSQL: `pg_dump todo_db > backup.sql`

---

## 🚀 NEXT STEPS

1. ✅ Verify all files exist (see checklist above)
2. ✅ Start backend: `cd backend && npm start`
3. ✅ Start frontend: `cd frontend && npm start`
4. ✅ Open http://localhost:3000
5. ✅ Follow QUICK_TEST_GUIDE.md to test features
6. ✅ Read ARCHITECTURE.md to understand design
7. ✅ Follow GIT_WORKFLOW.md for git strategy
8. ✅ Deploy using appropriate platform

---

## 📋 FINAL CHECKLIST

- ✅ Node.js and npm installed
- ✅ PostgreSQL installed and running
- ✅ All project files present
- ✅ .env files configured
- ✅ Dependencies installed (`npm install`)
- ✅ Database initialized (`node src/setupDB.js`)
- ✅ Backend starts successfully (`npm start`)
- ✅ Frontend starts successfully (`npm start`)
- ✅ Can access http://localhost:3000
- ✅ Can register and login

**If all checked: YOU'RE READY TO GO! 🚀**

---

**Questions? Check the other documentation files in the root directory!**
