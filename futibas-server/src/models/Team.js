const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const TeamSchema = mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Player'
    }, //References Player Model
    team_name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

TeamSchema.plugin(mongoosePaginate);

mongoose.model('Team', TeamSchema);