const { createLogger, format, transports } = require('winston');
const { LEVEL, NODE_ENV } = require('./env-vars');

// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const formatParams = (info) => {
  const {
    timestamp, level, message, ...args
  } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');

  return `${ts} ${level}: ${message} ${Object.keys(args).length
    ? JSON.stringify(args, '', '')
    : ''}`;
};

const Format = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
);

const transportArray = (
  NODE_ENV === 'production'
    ? [new transports.File({ filename: 'error.log', level: 'error' })]
    : [new transports.Console()]
);

const logger = createLogger({
  LEVEL,
  format: Format,
  transports: transportArray,
});

module.exports = logger;
