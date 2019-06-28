const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Assessment = require('../models/Assessment');
const User = require('../models/User');
const OKR = require('../models/OKR');
const Project = require('../models/Project');

// @route   POST api/assessments
// desc     Create an assessment
// @access  Private

router.post('/',
  [
    auth,
    [
      check('okrs', 'OKR is required').not().isEmpty(),
      check('projects', 'Project is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      okrs,
      projects,
      comment
    } = req.body;

    // Build assessment object
    const assessmentFields = {};
    assessmentFields.user = req.user.id;
    if (okrs) assessmentFields.okrs = okrs;
    if (projects) assessmentFields.projects = projects;
    if (comment) assessmentFields.comment = comment;

    try {
      let assessment = await Assessment.findOne({ user: req.user.id });
      // Update
      if (assessment) {
        assessment = await Assessment.findOneAndUpdate(
          { user: req.user.id },
          { $set: assessmentFields },
          { new: True }
        );
        return res.json(assessment);
      }
      // Create
      assessment = new Assessment(assessmentFields);
      await assessment.save();
      res.json(assessment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/assessments
// desc     Get all assessments
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
