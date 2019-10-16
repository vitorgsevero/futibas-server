const express = require('express');
const routes = express.Router();

const MatchController = require('./controllers/MatchController');
const PlayerController = require('./controllers/PlayerController');
const TeamController = require('./controllers/TeamController');


//Match Routes
routes.get('/match', MatchController.getAll);
routes.get('/match/:id', MatchController.getById);
routes.post('/match', MatchController.create);
routes.delete('/match/:id', MatchController.deleteOne);
routes.put('/match/:id', MatchController.updateOne);

//Player Routes
routes.get('/player', PlayerController.getAll);
routes.get('/player/:id', PlayerController.getById);
routes.get('/player/position/:player_position', PlayerController.getByPosition);
routes.post('/player', PlayerController.create);
routes.delete('/player/:id', PlayerController.deleteOne);
routes.put('/player/:id', PlayerController.updateOne);

//Team Routes
routes.get('/team', TeamController.getTeam);
routes.post('/team', TeamController.create);
routes.delete('/team/:id', TeamController.deleteOne);
routes.put('/team/:id', TeamController.updateOne);

module.exports = routes;