const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  id: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  assignment: {
    okrs: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'okr'
        },
        title: {
          type: String,
          required: false
        },
        quarter: {
          type: Number,
          required: false
        },
        year: {
          type: Number,
          required: false
        }
      }
    ],
    projects: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'project'
        },
        title: {
          type: String,
          required: false
        },
        quarter: {
          type: Number,
          required: false
        },
        year: {
          type: Number,
          required: false
        }
      }
    ],
  }
});

module.exports = User = mongoose.model('user', UserSchema);
