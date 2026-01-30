import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ==================== AUTH API ====================

export const authAPI = {
  register: (email, password, firstName, lastName) =>
    apiClient.post('/auth/register', { email, password, firstName, lastName }),
  
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  
  getProfile: () =>
    apiClient.get('/auth/profile'),
  
  updateProfile: (firstName, lastName) =>
    apiClient.patch('/auth/profile', { firstName, lastName }),
};

// ==================== BOARDS API ====================

export const boardsAPI = {
  create: (title, description, color) =>
    apiClient.post('/boards', { title, description, color }),
  
  getAll: () =>
    apiClient.get('/boards'),
  
  getById: (boardId) =>
    apiClient.get(`/boards/${boardId}`),
  
  update: (boardId, title, description, color) =>
    apiClient.patch(`/boards/${boardId}`, { title, description, color }),
  
  delete: (boardId) =>
    apiClient.delete(`/boards/${boardId}`),
};

// ==================== TODOS API ====================

export const todosAPI = {
  create: (boardId, title, description, priority, dueDate) =>
    apiClient.post(`/boards/${boardId}/todos`, { 
      title, 
      description, 
      priority, 
      dueDate 
    }),
  
  getAll: (boardId, status, priority) => {
    const params = {};
    if (status) params.status = status;
    if (priority) params.priority = priority;
    return apiClient.get(`/boards/${boardId}/todos`, { params });
  },
  
  getById: (boardId, todoId) =>
    apiClient.get(`/boards/${boardId}/todos/${todoId}`),
  
  update: (boardId, todoId, updates) =>
    apiClient.patch(`/boards/${boardId}/todos/${todoId}`, updates),
  
  delete: (boardId, todoId) =>
    apiClient.delete(`/boards/${boardId}/todos/${todoId}`),
};

export default apiClient;
