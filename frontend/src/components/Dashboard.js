import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import config from '../config';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Get auth token from localStorage
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(config.endpoints.tasks, getAuthHeader());
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (taskData) => {
    try {
      const response = await axios.post(
        config.endpoints.tasks,
        taskData,
        getAuthHeader()
      );
      setTasks([...tasks, response.data]);
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error(err);
    }
  };

  // Update a task
  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(
        `${config.endpoints.tasks}/${id}`,
        taskData,
        getAuthHeader()
      );
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
      setEditTask(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  // Toggle task completion status
  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(
        `${config.endpoints.tasks}/${id}`,
        { completed: !completed },
        getAuthHeader()
      );
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error(err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${config.endpoints.tasks}/${id}`, getAuthHeader());
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">My Tasks</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="dashboard-actions">
        <button 
          className="btn btn-primary" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <FaPlus /> {showAddForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>
      
      {showAddForm && (
        <TaskForm 
          onSubmit={addTask} 
          onCancel={() => setShowAddForm(false)} 
        />
      )}
      
      {editTask && (
        <div className="edit-form-container">
          <h3>Edit Task</h3>
          <TaskForm 
            task={editTask} 
            onSubmit={(data) => updateTask(editTask._id, data)} 
            onCancel={() => setEditTask(null)} 
          />
        </div>
      )}
      
      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="no-tasks">No tasks found. Add a task to get started!</div>
      ) : (
        <div className="tasks-container">
          <div className="tasks-header">
            <div className="task-title-header">Title</div>
            <div className="task-status-header">Status</div>
            <div className="task-actions-header">Actions</div>
          </div>
          
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onEdit={() => setEditTask(task)} 
              onDelete={() => deleteTask(task._id)} 
              onToggleComplete={() => toggleComplete(task._id, task.completed)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
