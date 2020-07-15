const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Create projects
router.post(
  '/',
  auth,
  [check('name').not().isEmpty().withMessage('Name is required')],
  projectController.createProject,
);

//Get all user projects
router.get('/', auth, projectController.getProjects);

//Update a project by id
router.put(
  '/:id',
  auth,
  [check('name').not().isEmpty().withMessage('Name is required')],
  projectController.updateProject,
);

//Delete a project by id
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
