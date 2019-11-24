const config = require('../../config');

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.futibasClientDomain);
  res.header("Access-Control-Allow-Headers", config.cors.allowedHeaders);
  next();
}

module.exports = cors;