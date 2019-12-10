const express = require('express');
const app = express();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const cors = require('./src/middleware/cors');
const config = require('./config');

app.use(cors);
app.use(express.json());
requireDir('./src/models');

//MongoDB
mongoose.connect('mongodb://localhost:27017/futibas', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//Routes
app.use('/api/users', require('./src/routes/api/users'));
app.use('/api/player', require('./src/routes/api/player'));
app.use('/api/auth', require('./src/routes/api/auth'));

// app.use('/api/team', require('./src/routes/api/team'));

app.use('/api/match', require('./src/routes/api/match'));

//Log File
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
});
app.use(logger('combined', { stream: accessLogStream }));

//Logs
var loggedAt = function(req, res, next) {
  requestTime = req.requestTime = new Date().toDateString();
  console.log('Request Date: ' + requestTime);
  next();
};

app.use(loggedAt);

app.listen(config.port, () => {
  console.log(`Futibas Server listening on port ${config.port}!`);
});
