const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  match_name: {
    type: String,
    required: true
  },
  match_date: {
    type: Date,
    required: true
  },
  match_type: {
    type: String,
    required: true
  },
  match_place: {
    type: String,
    required: true
  },
  match_schema: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Match = mongoose.model('match', MatchSchema);
