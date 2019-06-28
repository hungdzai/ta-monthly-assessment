const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');


// @route GET api/projects/
// @desc Fetch all projects
// @access Public
router.get(
  '/',
  async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route POST api/projects
// desc Create a project
// @access Public
router.post(
  '/',
  async (req, res) => {
    try {
      const newProject = new Project({
        title: req.body.title,
        quarter: req.body.quarter,
        year: req.body.year
      });
      const project = await newProject.save();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  }
);

// @route DELETE api/projects/:id
// desc Delete a project
// @access Public
router.delete(
  '/:id',
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
      await project.remove();
      res.json({ msg: 'Post deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

