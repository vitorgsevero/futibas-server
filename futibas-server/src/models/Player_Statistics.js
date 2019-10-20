const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Player_Statistics_Schema = mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Player'
    }, //References Player Model
    player_goals: {
        type: Number,
        required: true
    },
    player_assists: {
        type: Number,
        required: true
    },
    player_goals: {
        type: Number,
        required: true
    },
    player_rating: {
        type: Number,
        required: true
    }
});


Player_Statistics_Schema.plugin(mongoosePaginate);

mongoose.model('Player_Statistics', Player_Statistics_Schema);