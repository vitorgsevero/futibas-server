const mongoose = require('mongoose');

const Match = mongoose.model('Match');


module.exports = {
    async getAll(req, res, next) {
        const { page = 1 } = req.query;
        const matchs = await Match.paginate({}, { page, limit: 10 });
        next(); // it will call the next middleware
        return res.json(matchs);
    },
    async getById(req, res, next) {
        try {
            const match = await Match.findById(req.params.id);
            return res.json(match);
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
            next();
        }
    },
    async create(req, res) {
        // try {
        //     const match = await Match.create(req.body);
        //     return res.json(match);
        // } catch (error) {
        //     let errorMsg = " was not created!";
        //     res.status(404).json(req.params.id + errorMsg);
        // }

        
        
    },
    async deleteOne(req, res) {
        try {
            const match = await Match.findByIdAndRemove(req.params.id);
            res.json(match.match_name + " was deleted succesfully!");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
        }
    },
    async updateOne(req, res) {
        try {
            const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(match + " was updated succesfully");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
        }
    }
}