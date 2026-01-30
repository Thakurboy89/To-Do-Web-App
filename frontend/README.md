# Frontend - To-Do Application

## Overview
React-based frontend for the To-Do application with modern UI and responsive design.

## Quick Start

### Installation
```bash
npm install
```

### Configuration
Edit `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Run Application
```bash
npm start
```

App opens on `http://localhost:3000`

## Folder Structure

- **components/**: Reusable React components
- **pages/**: Full page components
- **context/**: React Context for state management
- **services/**: API service layer
- **styles/**: CSS styling files
- **utils/**: Utility functions
- **public/**: Static files

## Key Features

- Modern React 18 with hooks
- React Router for navigation
- Axios for HTTP requests
- Context API for authentication
- Responsive CSS design
- Protected routes
- Form validation

## Authentication Flow

1. User registers or logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent with each API request in Authorization header
5. Protected routes check token validity

## Component Tree

```
App
├── Router
│   ├── Login (public)
│   ├── Register (public)
│   ├── PrivateRoute
│   │   ├── Dashboard
│   │   │   └── BoardCard (multiple)
│   │   └── Board
│   │       └── TodoItem (multiple)
```

## State Management

- **AuthContext**: Manages user authentication state
- **Local State**: Component-level state with useState

## Styling Approach

- CSS modules pattern
- Mobile-first responsive design
- CSS variables for theming
- Flexbox and Grid layouts

## Environment Variables

- `REACT_APP_API_URL`: Backend API base URL
