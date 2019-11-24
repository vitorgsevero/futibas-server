const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  age: {
    type: Number
  },
  position: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  skills: {
    type: [String],
    required: true
  },
  statistics: [
    {
      goals: {
        type: String
      },
      assists: {
        type: String
      },
      matches: {
        type: String
      },
      rating: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Player = mongoose.model('player', PlayerSchema);
