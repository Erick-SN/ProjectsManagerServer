const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

//Create task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { project } = req.body;
    const projectExist = await Project.findById(project);
    if (!projectExist) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    if (projectExist.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You are not authorized' });
    }
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
};

//Get task per project
exports.getTask = async (req, res) => {
  try {
    const { project } = req.query;
    const projectExist = await Project.findById(project);
    if (!projectExist) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    if (projectExist.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You are not authorized' });
    }
    const tasks = await Task.find({ project }).sort({ created: -1 });
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
};

//Update task
exports.updateTask = async (req, res) => {
  try {
    const { project, name, state } = req.body;
    //Validate if task exists

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    //Validate if project exists
    const projectExist = await Project.findById(project);
    if (projectExist.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You are not authorized' });
    }

    const newTask = {};

    newTask.name = name;
    newTask.state = state;

    //Save new task
    task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
};

//Delete Task by id
exports.deleteTask = async (req, res) => {
  try {
    const { project } = req.query;
    //Validate if task exists

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    //Validate if project exists
    const projectExist = await Project.findById(project);
    if (projectExist.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You are not authorized' });
    }
    //Delete task
    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Task deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
};
