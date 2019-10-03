const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const PlayerSchema = mongoose.Schema({
    player_name: {
        type: String,
        required: true
    },
    player_age: {
        type: Date,
        required: true
    },
    player_position: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

PlayerSchema.plugin(mongoosePaginate);

mongoose.model('Player', PlayerSchema);