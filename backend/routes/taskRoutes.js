const express = require('express');
const router = express.Router();
const { 
  getTasks, 
  createTask, 
  getTaskById, 
  updateTask, 
  deleteTask 
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Routes
router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
