const express = require('express');
const app = express();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const cors = require('./src/middlewares/cors');
const config = require('./config');

app.use(cors);
app.use(express.json());

requireDir('./src/models');

//MongoDB
mongoose.connect("mongodb://localhost:27017/futibas", { useNewUrlParser: true });

//Routes
app.use('/api', require('./src/routes'));

//Log File
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }))

//Logs
var loggedAt = function (req, res, next) {
  requestTime = req.requestTime = new Date().toDateString();
  console.log("Request Date: " + requestTime);
  next();
};

app.use(loggedAt);

app.listen(config.port, () => {
  console.log(`Futibas Server listening on port ${config.port}!`);
});