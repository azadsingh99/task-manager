import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  // If editing a task, populate form with task data
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || ''
      });
    }
  }, [task]);

  const { title, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form if not editing
    if (!task) {
      setFormData({ title: '', description: '' });
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
            rows="3"
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            <FaSave /> {task ? 'Update' : 'Save'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            <FaTimes /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
