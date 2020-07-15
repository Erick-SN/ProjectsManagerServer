const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Create a task
router.post(
  '/',
  auth,
  [
    check('name').not().isEmpty().withMessage('Task name is required'),
    check('project').not().isEmpty().withMessage('Project is required'),
  ],
  taskController.createTask,
);

//Get tasks per project
router.get('/', auth, taskController.getTask);

//Update tasks by id
router.put('/:id', auth, taskController.updateTask);

//Delete a task by id
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
