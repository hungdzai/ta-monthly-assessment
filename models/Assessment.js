const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: new Date()
  },
  okrs: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'okr'
      },
      items: [
        {
          item: {
            type: String,
            required: true
          },
          score: {
            type: Number,
            required: true
          }
        }
      ],
      score: {
        type: Number,
        required: true
      }
    }
  ],
  projects: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'project'
      },
      score: {
        type: Number,
        required: true
      }
    }
  ],
  comment: {
    type: String,
    required: true
  }
});

module.exports = Assessment = mongoose.model('assessment', AssessmentSchema);
