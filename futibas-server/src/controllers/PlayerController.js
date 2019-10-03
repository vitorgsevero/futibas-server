const mongoose = require('mongoose');

const Player = mongoose.model('Player');


module.exports = {
    async getAll(req, res, next) {
        const { page = 1 } = req.query;
        const players = await Player.paginate({}, { page, limit: 10 });
        next(); // it will call the next middleware
        return res.json(players);
    },
    async getById(req, res, next) {
        try {
            const player = await Player.findById(req.params.id);
            return res.json(player);
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
            next();
        }
    },
    async getByPosition(req, res, next) {
        try {
            const positionParams = req.params.player_position;
            const player = await Player.find({
                "player_position": new RegExp(positionParams, 'i')
            });
            return res.status(200).json(player);
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
            next();
        }
    },
    async create(req, res) {
        try {
            const player = await Player.create(req.body);
            return res.json(player);
        } catch (error) {
            console.log(error);
            let errorMsg = " was not created!";
            res.status(404).json(req.params.id + errorMsg);
        }
    },
    async deleteOne(req, res) {
        try {
            const player = await Player.findByIdAndRemove(req.params.id);
            res.json(player.player_name + " was deleted succesfully!");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
        }
    },
    async updateOne(req, res) {
        try {
            const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(player + " was updated succesfully");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
        }
    }
}