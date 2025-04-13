import React from 'react';
import { FaEdit, FaTrash, FaCheck, FaUndo } from 'react-icons/fa';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const { _id, title, description, completed, createdAt } = task;
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h3 className="task-title">{title}</h3>
        {description && <p className="task-description">{description}</p>}
        <p className="task-date">Created: {formatDate(createdAt)}</p>
      </div>
      
      <div className="task-status">
        <span className={`status-badge ${completed ? 'completed' : 'pending'}`}>
          {completed ? 'Completed' : 'Pending'}
        </span>
      </div>
      
      <div className="task-actions">
        <button 
          className="btn btn-sm btn-toggle" 
          onClick={onToggleComplete}
          title={completed ? "Mark as pending" : "Mark as completed"}
        >
          {completed ? <FaUndo /> : <FaCheck />}
        </button>
        
        <button 
          className="btn btn-sm btn-edit" 
          onClick={onEdit}
          title="Edit task"
        >
          <FaEdit />
        </button>
        
        <button 
          className="btn btn-sm btn-delete" 
          onClick={onDelete}
          title="Delete task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
