import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boardsAPI, todosAPI } from '../services/api';
import TodoItem from '../components/TodoItem';
import '../styles/board.css';

const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const fetchBoard = async () => {
    try {
      setLoading(true);
      const response = await boardsAPI.getById(boardId);
      setBoard(response.data.data);
      setTodos(response.data.data.todos || []);
      setError('');
    } catch (err) {
      setError('Failed to load board');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) {
      setError('Todo title is required');
      return;
    }

    try {
      const response = await todosAPI.create(
        boardId,
        newTodo.title,
        newTodo.description,
        newTodo.priority,
        newTodo.dueDate || null
      );
      setTodos([response.data.data, ...todos]);
      setNewTodo({ title: '', description: '', priority: 'medium', dueDate: '' });
      setShowCreateForm(false);
      setError('');
    } catch (err) {
      setError('Failed to create todo');
    }
  };

  const handleUpdateTodo = async (todoId, updates) => {
    try {
      const response = await todosAPI.update(boardId, todoId, updates);
      setTodos(todos.map(t => t.id === todoId ? response.data.data : t));
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await todosAPI.delete(boardId, todoId);
      setTodos(todos.filter(t => t.id !== todoId));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const getFilteredTodos = () => {
    if (filter === 'all') return todos;
    return todos.filter(t => t.status === filter);
  };

  if (loading) return <div className="board-container"><p>Loading...</p></div>;
  if (!board) return <div className="board-container"><p>Board not found</p></div>;

  const filteredTodos = getFilteredTodos();

  return (
    <div className="board-container">
      <header className="board-header">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>← Back</button>
        <div>
          <h1>{board.title}</h1>
          {board.description && <p className="board-description">{board.description}</p>}
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="board-controls">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'todo' ? 'active' : ''}`}
            onClick={() => setFilter('todo')}
          >
            To Do
          </button>
          <button 
            className={`filter-btn ${filter === 'in_progress' ? 'active' : ''}`}
            onClick={() => setFilter('in_progress')}
          >
            In Progress
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        
        {!showCreateForm && (
          <button 
            className="btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            + Add Todo
          </button>
        )}
      </div>

      {showCreateForm && (
        <div className="create-todo-form">
          <form onSubmit={handleCreateTodo}>
            <div className="form-group">
              <label htmlFor="title">Todo Title</label>
              <input
                type="text"
                id="title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                placeholder="What needs to be done?"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="Add more details..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">Create Todo</button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="todos-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-state">No todos in this view</p>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              boardId={boardId}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
