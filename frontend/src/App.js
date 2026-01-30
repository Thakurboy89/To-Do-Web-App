import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import Profile from './pages/Profile';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes wrapped in provider to use navigate */}
        <Route
          path="/login"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path="/register"
          element={
            <AuthProvider>
              <Register />
            </AuthProvider>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <AuthProvider>
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </AuthProvider>
          }
        />
        <Route
          path="/board/:boardId"
          element={
            <AuthProvider>
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            </AuthProvider>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthProvider>
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            </AuthProvider>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
