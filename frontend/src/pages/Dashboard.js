import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { boardsAPI } from '../services/api';
import BoardCard from '../components/BoardCard';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBoard, setNewBoard] = useState({
    title: '',
    description: '',
    color: '#3498db',
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const response = await boardsAPI.getAll();
      setBoards(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load boards');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newBoard.title.trim()) {
      setError('Board title is required');
      return;
    }

    try {
      const response = await boardsAPI.create(
        newBoard.title,
        newBoard.description,
        newBoard.color
      );
      setBoards([response.data.data, ...boards]);
      setNewBoard({ title: '', description: '', color: '#3498db' });
      setShowCreateForm(false);
      setError('');
    } catch (err) {
      setError('Failed to create board');
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (!window.confirm('Are you sure you want to delete this board?')) return;

    try {
      await boardsAPI.delete(boardId);
      setBoards(boards.filter(b => b.id !== boardId));
    } catch (err) {
      setError('Failed to delete board');
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>My Boards</h1>
          <p>Welcome, {user?.firstName || user?.email}</p>
        </div>
        <div className="header-right">
          <button 
            className="btn-secondary"
            onClick={() => navigate('/profile')}
          >
            Profile
          </button>
          <button 
            className="btn-danger"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="boards-section">
        {showCreateForm && (
          <div className="create-board-form">
            <h3>Create New Board</h3>
            <form onSubmit={handleCreateBoard}>
              <div className="form-group">
                <label htmlFor="title">Board Title</label>
                <input
                  type="text"
                  id="title"
                  value={newBoard.title}
                  onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
                  placeholder="e.g., Project Alpha"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newBoard.description}
                  onChange={(e) => setNewBoard({ ...newBoard, description: e.target.value })}
                  placeholder="Board description"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                  type="color"
                  id="color"
                  value={newBoard.color}
                  onChange={(e) => setNewBoard({ ...newBoard, color: e.target.value })}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">Create Board</button>
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

        {!showCreateForm && (
          <button 
            className="btn-primary btn-create"
            onClick={() => setShowCreateForm(true)}
          >
            + New Board
          </button>
        )}

        {loading ? (
          <p className="loading">Loading boards...</p>
        ) : boards.length === 0 ? (
          <p className="empty-state">No boards yet. Create your first board!</p>
        ) : (
          <div className="boards-grid">
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onDelete={handleDeleteBoard}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
