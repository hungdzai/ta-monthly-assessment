const express = require('express');
const router = express.Router();

// Get data model 
const User = require('../../models/User');
const OKR = require('../../models/OKR');
const Project = require('../../models/Project');

// @route   GET /api/users/
// desc     Get all registered users
// @access  Private
router.get(
  '/',
  async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/users/:id
// desc     Delete an user
// @access  Public
router.delete(
  '/:id',
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      await user.remove();
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  }
);

// @route   GET api/users/:id
// desc     Fetch an user's assignment
// @access  Public
router.get(
  '/:id',
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const { _id, assignment } = user;
      res.json({
        _id: _id,
        assignment: assignment
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users/:user_id/okr/:okr_id
// desc     Assign an OKR to the user
// @access  Public
router.put(
  '/:user_id/okr/:okr_id',
  async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const { _id, title, quarter, year } = await OKR.findById(req.params.okr_id);
      const okr = {
        id: _id,
        title: title,
        quarter: quarter,
        year: year
      };
      user.assignment.okrs.unshift(okr);
      await user.save();
      res.json(okr);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users/:user_id/okr/:okr_id
// desc     Revoke an assigned OKR
// @access  Public
router.delete(
  '/:user_id/okr/:okr_id',
  async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const okr = user.assignment.okrs.find(okr => okr._id == req.params.okr_id);
      if (!okr) {
        return res.status(404).json({ msg: 'OKR not found' });
      }
      okr.remove();
      await user.save();
      res.json({ msg: 'OKR revoked' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users/:user_id/project/:project_id
// desc     Assign a Project to the user
// @access  Public
router.put(
  '/:user_id/project/:project_id',
  async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const { _id, title, quarter, year } = await Project.findById(req.params.project_id);
      const project = {
        id: _id,
        title: title,
        quarter: quarter,
        year: year
      };
      user.assignment.projects.unshift(project);
      await user.save();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users/:user_id/project/:project_id
// desc     Revoke an assigned project
// @access  Public
router.delete(
  '/:user_id/project/:project_id',
  async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const project = user.assignment.projects.find(project => project._id == req.params.project_id);
      if (!project) {
        return res.status(404).json({ msg: 'OKR not found' });
      }
      project.remove();
      await user.save();
      res.json({ msg: 'OKR revoked' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
