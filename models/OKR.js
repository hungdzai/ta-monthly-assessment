const mongoose = require('mongoose');

const OKRSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  items: [
    {
      text: {
        type: String,
        required: true
      }
    }
  ],
  quarter: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

module.exports = OKR = mongoose.model('okr', OKRSchema);
