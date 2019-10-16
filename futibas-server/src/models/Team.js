const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const TeamSchema = mongoose.Schema({
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