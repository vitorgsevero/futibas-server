const config = {
  port: 3000 || process.env.PORT,
  futibasClientDomain: 'http://localhost:8080',
  cors: {
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
  }
}

module.exports = config;