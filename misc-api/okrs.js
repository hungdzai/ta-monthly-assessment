const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const OKR = require('../models/OKR');

// @route   POST api/okrs
// desc     Create an OKR with items
// @access  Private
router.post('/',
  [
    auth,
    [
      check('text', 'OKR\'s name is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const newOKR = new OKR({
        text: req.body.text,
        items: req.body.items
      });
      const okr = newOKR.save();
      res.json(okr);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  }
);

// @route POST api/projects
// desc Edit a project
// @access Private


// @route   GET api/okrs
// desc     Get all okrs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const okrs = await OKR.find().sort({ date: -1 });
    res.json(okrs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/okrs/:okr_id
// desc     Delete an OKR
// @access  Private
router.delete('/:okr_id', auth, async (req, res) => {
  try {
    const okr = await OKR.findById(req.params.okr_id);
    if (!okr) {
      return res.status(404).json({ msg: 'OKR not found' });
    }
    await okr.remove();
    res.json({ msg: 'OKR removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') { //catch invalid objectid 
      return res.status(404).json({ msg: 'OKR not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/okrs/item/:okr_id
// desc     Add OKR item
// @access  Private
router.put('/item/:okr_id',
  [
    auth,
    [
      check('text', 'Item content is required').not().isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const okr = await OKR.findById(req.params.okr_id);
      if (!okr) {
        return res.status(404).json({ msg: 'OKR not found' });
      }
      const newItem = { text: req.body.text };
      okr.items.unshift(newItem);
      await okr.save();
      res.json(okr);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/okrs/item/:okr_id/:item_id
// desc     Delete OKR item
// @access  Private
router.delete('/item/:okr_id/:item_id', auth, async (req, res) => {
  try {
    // Find okr
    const okr = await OKR.findById(req.params.okr_id);
    if (!okr) {
      return res.status(404).json({ msg: 'OKR not found' });
    }
    // Find item
    const item = okr.items.find(item => item.id === req.params.item_id);
    if (!item) {
      return res.status(401).json({ msg: 'Item not found' });
    }
    // Remove
    item.remove();
    await okr.save();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
