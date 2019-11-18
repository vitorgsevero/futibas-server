const mongoose = require('mongoose');

const Team = mongoose.model('Team');
const Player = mongoose.model('Player');


module.exports = {
    async getTeam(req, res, next) {
        const { page = 1 } = req.query;
        const teams = await Team.paginate({}, { page, limit: 10 });
        next(); // it will call the next middleware
        return res.json(teams);
    },
    async create(req, res) {
        try {
            Player.findById(req.body.productId)
                .then(player => {
                    if (!player) {
                        return res.status(404).json({
                            message: "Player not found"
                        });
                    }
                    const team = new Team({
                        _id: mongoose.Types.ObjectId(),
                        team_name: req.body.team_name
                    });
                    return team.save();
                })
        } catch{
            console.log(error);
            let errorMsg = " was not created!";
            res.status(404).json(req.params.id + errorMsg);
        }
    },
    async deleteOne(req, res) {
        try {
            const team = await Team.findByIdAndRemove(req.params.id);
            res.json(team.team_name + " was deleted succesfully!");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
        }
    },
    async updateOne(req, res) {
        try {
            const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(team + " was updated succesfully");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
        }
    },
}