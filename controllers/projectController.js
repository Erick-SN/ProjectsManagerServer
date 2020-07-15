const Project = require('../models/Project');
const { validationResult } = require('express-validator');

//Create a project
exports.createProject = async (req, res) => {
  //Errors?
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Create new project
    const project = new Project(req.body);
    // Save de owner
    project.owner = req.user.id;
    project.save();
    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
};

//Get user projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({
      created: -1,
    });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
};

//Update a project
exports.updateProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const newProject = {};
  if (name) {
    newProject.name = name;
  }

  try {
    //Check project id
    let project = await Project.findById(req.params.id);
    //Check project
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    //Check owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You are not allowed' });
    }
    //Update projects
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true },
    );
    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
};

//Delete a project
exports.deleteProject = async (req, res) => {
  try {
    //Check project id
    let project = await Project.findById(req.params.id);
    //Check project
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    //Check owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You are not allowed' });
    }
    //Delete project
    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Project deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Erron on server');
  }
};
