const express = require('express');
const routes = express.Router();

const MatchController = require('./controllers/MatchController');


//Match Routes
routes.get('/match', MatchController.getAll);
routes.get('/match/:id', MatchController.getById);
routes.post('/match', MatchController.create);
routes.delete('/match/:id', MatchController.deleteOne);
routes.put('/match/:id', MatchController.updateOne);


module.exports = routes;