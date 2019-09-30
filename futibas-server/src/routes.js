const express = require('express');
const routes = express.Router();

const MatchController = require('./controllers/MatchController');


//Match Routes
routes.get('/match', MatchController.getAll);

module.exports = routes;