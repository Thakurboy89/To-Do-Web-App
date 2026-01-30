# Quick Test Guide - To-Do Web App

## 🚀 Application is Live

```
Backend:  http://localhost:5000 ✅
Frontend: http://localhost:3000 ✅
Database: PostgreSQL (todo_db) ✅
```

---

## 📝 Step-by-Step Testing

### **Step 1: Open the Application**
- Navigate to: `http://localhost:3000`
- You should see the **Login/Register** page

---

### **Step 2: Register a New User**
Click **"Don't have an account? Register"** link

**Fill in the form:**
```
Email:           test@example.com
Password:        MyPassword123
Confirm Password: MyPassword123
First Name:      John
Last Name:       Doe
```

**Click Register** → You will auto-login and go to Dashboard

---

### **Step 3: Create Your First Board**
On the **Dashboard** page:

**Fill in the board creation form:**
```
Board Title:    Work Projects
Description:    Projects and tasks for work
Color:          #3498db (blue)
```

**Click "Create Board"** → Board appears on dashboard

---

### **Step 4: Open the Board**
- Click on the board card to open it
- You'll see an empty board with the **"Add Todo"** form

---

### **Step 5: Create Your First Todo**
**Fill in the todo form:**
```
Title:       Complete project documentation
Priority:    High
Due Date:    2026-02-15
Description: Write comprehensive README and setup guide
```

**Click "Add Todo"** → Todo appears in the list

---

### **Step 6: Create More Todos**
Create 2-3 more todos to test filtering:

**Todo 2:**
```
Title:       Review code
Priority:    Medium
Due Date:    2026-02-10
Status:      in_progress
```

**Todo 3:**
```
Title:       Update database schema
Priority:    Low
Due Date:    2026-02-20
Status:      completed
```

---

### **Step 7: Test Filtering**
At the top of the board, you'll see status buttons:
- **All** - Shows all todos
- **To Do** - Shows only to-do items
- **In Progress** - Shows only in-progress items
- **Completed** - Shows only completed items

**Click each button** to test filtering

---

### **Step 8: Update a Todo**
Click on any todo item to expand it:
- ✏️ Click **Edit** to modify details
- ✓ Checkbox to toggle completion
- 🗑️ Delete button to remove

**Edit a todo:**
- Change status from "todo" to "in_progress"
- Change priority
- Update description

**Click Save** to update

---

### **Step 9: Test Board Management**
Go back to the **Dashboard**:
- Click on your board to open
- Click on the board title area to see options
- Try **updating** board details
- Try **creating another board**

---

### **Step 10: Test User Profile**
Click your **email** in the top-right corner (or "Profile"):
- View your profile information
- Update first name or last name
- Click **Update Profile**

---

### **Step 11: Logout and Login**
Click **Logout** button:
- You'll be redirected to Login page
- Try logging in with your credentials

**Login:**
```
Email:    test@example.com
Password: MyPassword123
```

---

## 🔍 API Testing (Optional)

### **Test Backend Directly**

**1. Register (POST)**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api-test@example.com",
    "password": "TestPassword123",
    "firstName": "API",
    "lastName": "Test"
  }'
```

**2. Login (POST)**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api-test@example.com",
    "password": "TestPassword123"
  }'
```

Response will include a `token` - copy this for next requests.

**3. Create Board (POST)**
Replace `TOKEN` with your token from login:
```bash
curl -X POST http://localhost:5000/api/boards \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "API Test Board",
    "description": "Testing via API",
    "color": "#e74c3c"
  }'
```

**4. Get Boards (GET)**
```bash
curl -X GET http://localhost:5000/api/boards \
  -H "Authorization: Bearer TOKEN"
```

**5. Get Board with Todos (GET)**
Replace `BOARD_ID` with actual board ID:
```bash
curl -X GET http://localhost:5000/api/boards/BOARD_ID \
  -H "Authorization: Bearer TOKEN"
```

---

## ✅ Features to Test

### Authentication
- ✅ Register with email validation
- ✅ Login with email/password
- ✅ Password strength validation
- ✅ JWT token persistence
- ✅ Logout functionality
- ✅ Protected routes (try accessing without login)

### Board Management
- ✅ Create board with title, description, color
- ✅ View all boards on dashboard
- ✅ Open board to see todos
- ✅ Update board details
- ✅ Delete board (cascade deletes todos)
- ✅ Color-coded boards

### Todo Management
- ✅ Create todo with priority and due date
- ✅ View all todos in board
- ✅ Filter by status (todo, in_progress, completed)
- ✅ Filter by priority (low, medium, high)
- ✅ Update todo details
- ✅ Mark todo complete (checkbox)
- ✅ Delete todo
- ✅ See created/updated timestamps

### User Profile
- ✅ View profile information
- ✅ Update first/last name
- ✅ View email (read-only)

---

## 🐛 Troubleshooting

### **Application not loading?**
```bash
# Check if frontend is running:
# Port 3000 should have React app
# Port 5000 should have API server

# Restart frontend:
cd "C:\Users\thaku\OneDrive\Desktop\To-Do Project\frontend"
npm start
```

### **Backend errors?**
```bash
# Check database setup:
cd "C:\Users\thaku\OneDrive\Desktop\To-Do Project\backend"
node src/setupDB.js

# Restart backend:
npm start
```

### **Can't login?**
- Verify email and password are correct
- Check that backend is running on port 5000
- Check browser console for error messages

### **Todos not showing?**
- Refresh the page (F5)
- Check browser console for errors
- Verify you're logged in

---

## 📊 Expected Test Results

### Success Indicators:
- ✅ User registration successful
- ✅ User login successful with JWT token
- ✅ Can create boards
- ✅ Can create todos in boards
- ✅ Can filter todos by status
- ✅ Can filter todos by priority
- ✅ Can update todo status/priority
- ✅ Can delete todos
- ✅ Can update profile
- ✅ Can logout
- ✅ Can login again with same credentials
- ✅ No console errors (only deprecation warnings are OK)

### Minor Warnings (These are OK):
- ESLint warnings about unused variables
- Webpack deprecation warnings
- These do NOT affect functionality

---

## 📱 Responsive Design Test

Try opening the app on different screen sizes:
- **Desktop** (1920px) - Full layout
- **Tablet** (768px) - Optimized layout
- **Mobile** (375px) - Responsive design

The app should adapt to all screen sizes properly.

---

## 🎯 Summary

The To-Do Web App is **fully functional** and ready for evaluation.

**All core features working:**
- ✅ Authentication (JWT + bcryptjs)
- ✅ Board CRUD operations
- ✅ Todo CRUD operations
- ✅ Status/Priority filtering
- ✅ User management
- ✅ Responsive UI

**Both servers running successfully:**
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

**Start testing now!** 🚀
