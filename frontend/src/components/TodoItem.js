import React, { useState } from 'react';
import '../styles/todoItem.css';

const TodoItem = ({ todo, boardId, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    status: todo.status,
    priority: todo.priority,
    dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : '',
  });

  const handleStatusChange = async (newStatus) => {
    await onUpdate(todo.id, { status: newStatus });
  };

  const handleToggleComplete = async () => {
    await onUpdate(todo.id, { 
      completed: !todo.completed,
      status: !todo.completed ? 'completed' : 'todo'
    });
  };

  const handleSaveEdit = async () => {
    await onUpdate(todo.id, editData);
    setIsEditing(false);
  };

  const priorityColor = {
    low: '#27ae60',
    medium: '#f39c12',
    high: '#e74c3c',
  };

  const getStatusBadge = (status) => {
    const badges = {
      todo: 'To Do',
      in_progress: 'In Progress',
      completed: 'Completed',
    };
    return badges[status] || status;
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-header" onClick={() => setIsExpanded(!isExpanded)}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="todo-checkbox"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="todo-title-section">
          <h4>{todo.title}</h4>
          <div className="todo-badges">
            <span 
              className="badge priority"
              style={{ backgroundColor: priorityColor[todo.priority] }}
            >
              {todo.priority}
            </span>
            <span className="badge status">
              {getStatusBadge(todo.status)}
            </span>
            {todo.dueDate && (
              <span className="badge due-date">
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="todo-details">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={editData.priority}
                    onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="edit-actions">
                <button 
                  className="btn-primary btn-small"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
                <button 
                  className="btn-secondary btn-small"
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      title: todo.title,
                      description: todo.description,
                      status: todo.status,
                      priority: todo.priority,
                      dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : '',
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="todo-content">
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
              <div className="todo-actions">
                <button 
                  className="btn-secondary btn-small"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button 
                  className="btn-danger btn-small"
                  onClick={() => {
                    if (window.confirm('Delete this todo?')) {
                      onDelete(todo.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
