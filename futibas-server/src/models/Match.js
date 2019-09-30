const mongoose = require('mongoose');


const MatchSchema = mongoose.Schema({
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
        default: Date.now,
    }
});

mongoose.model('Match', MatchSchema);