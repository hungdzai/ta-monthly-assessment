const express = require('express');
const router = express.Router();

// @route GET api/assessments
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Assessments route'));

module.exports = router;
