const mongoose = require('mongoose');
const { NODE_ENV, MONGO_OPTIONS, MONGO_URI } = require('./env-vars');
const logger = require('./logger');

mongoose.Promise = global.Promise;

mongoose.set('debug', NODE_ENV === 'development');

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB Connection Error ${err}`);
});

mongoose.connection.on('connected', () => {
  logger.info('Connected To DB');
});


/**
 * Connect to mongo db
 * @returns {object} Mongoose connection
 * @public
 */
exports.Connect = () => {
  mongoose.connect(MONGO_URI, MONGO_OPTIONS);
  return mongoose.connection;
};
