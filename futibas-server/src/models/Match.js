const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const MatchSchema = mongoose.Schema({
    // player: [{
    //     type: Schema.Types.ObjectId, ref: 'Player',
    //     require: true
    // }], //References Player Model
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

MatchSchema.plugin(mongoosePaginate);

mongoose.model('Match', MatchSchema);