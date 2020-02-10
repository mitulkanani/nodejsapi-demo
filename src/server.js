const http = require('http');

/**
 * App Imports
 */
const app = require('./config/express');
const { PORT, NODE_ENV } = require('./config/env-vars');
const { Connect } = require('./config/mongoose');
const logger = require('./config/logger');

// Create Http Server
const server = http.createServer(app);

server.listen(PORT);

server.on('listening', () => {
  Connect();
  logger.info(`${NODE_ENV.toUpperCase()} Server is Listening on PORT ${PORT}`);
});

// Listen to error on listening to port
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
server.on('error', onError);

/**
 * Exports Express
 * @public
 */
module.exports = server;
