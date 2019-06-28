const express = require('express');
const router = express.Router();
const OKR = require('../../models/OKR');

// @route GET api/okrs/:id
// @desc Fetch an okr
// @access Public
router.get(
  '/:id',
  async (req, res) => {
    try {
      const okr = await OKR.findById(req.params.id);
      res.json(okr);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/okrs/
// @desc Fetch all okrs
// @access Public
router.get(
  '/',
  async (req, res) => {
    try {
      const okrs = await OKR.find();
      res.json(okrs);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route POST api/okrs
// desc Add an OKR
// @access Public
router.post(
  '/',
  async (req, res) => {
    try {
      const newOKR = new OKR({
        title: req.body.title,
        quarter: req.body.quarter,
        year: req.body.year,
        items: req.body.items
      });
      const okr = await newOKR.save();
      res.json(okr);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  }
);

// @route DELETE api/projects/:id
// desc Delete an OKR
// @access Public
router.delete(
  '/:id',
  async (req, res) => {
    try {
      const okr = await OKR.findById(req.params.id);
      if (!okr) {
        return res.status(404).json({ msg: 'OKR not found' });
      }
      await okr.remove();
      res.json({ msg: 'OKR deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
