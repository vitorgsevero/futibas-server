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
    type: String
  },
  position: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: [
    {
      skill1: {
        type: String,
        required: true
      },
      skill1: {
        type: String,
        required: true
      },
      skill1: {
        type: String
      }
    }
  ],
  statistics: [
    {
      gols: {
        type: String,
        required: true
      },
      assistencias: {
        type: String,
        required: true
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
