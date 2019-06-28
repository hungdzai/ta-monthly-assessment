const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// Get data model 
const User = require('../../models/User');

// @route   POST api/auth
// desc     Authenticate
// @access  Public
router.post(
  '/',
  async (req, res) => {
    const { id } = req.body;
    try {
      // See if user exists
      const user = await User.findOne({ id });
      if (user) {
        return res.json({
          _id: user._id,
          isSignedIn: true,
          isRegistered: true,
          role: user.role
        });
      } else {
        return res.json({
          isSignedIn: true,
          isRegistered: false
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route   POST api/auth/register
// desc     Register user
// @access  Public
router.post(
  '/register',
  [
    check('role', 'Role is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, name, role, email } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ id });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      user = new User({ id, name, role, email });
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);




module.exports = router;
