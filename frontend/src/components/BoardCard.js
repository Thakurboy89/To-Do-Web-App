import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/boardCard.css';

const BoardCard = ({ board, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/board/${board.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(board.id);
  };

  return (
    <div 
      className="board-card"
      style={{ borderTopColor: board.color }}
      onClick={handleClick}
    >
      <div className="board-header">
        <h3>{board.title}</h3>
        <button 
          className="btn-delete"
          onClick={handleDelete}
          title="Delete board"
        >
          ×
        </button>
      </div>
      {board.description && (
        <p className="board-description">{board.description}</p>
      )}
      <div className="board-footer">
        <small>{new Date(board.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default BoardCard;
