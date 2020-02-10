const Joi = require('@hapi/joi');

/**
 * App Imports
 */
const APIError = require('../utils/APIErrors');
const { TOO_MANY_REQUESTS, NOT_FOUND } = require('../utils/http-status');
const { NODE_ENV } = require('../config/env-vars');

/**
 * Error Handler Sends Stack Trace only during Development Environment
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
const Handler = (err, req, res, next) => {
  const response = {
    code: err.status || 500,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  };
  if (NODE_ENV === 'production') delete response.stack;
  res.status(response.code).json(response);
  res.end();
};

exports.ErrorHandler = Handler;

/**
 * Convert Error Thrown By Express Validator OR Not an Instance of API Error
 * @public
 */
exports.ConvertError = (err, req, res, next) => {
  let ConvertedError = err;
  if (err instanceof Joi.ValidationError) {
    const errors = [];
    err.details.map(({ message, context: { key } }) => errors.push({ key, message: message.replace(/[^\w\s]/gi, '') }));
    ConvertedError = new APIError({
      message: 'Validation Error',
      status: err.status || 400,
      errors,
    });
  } else {
    ConvertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }
  return Handler(ConvertedError, req, res, next);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.NotFound = (req, res, next) => {
  const err = new APIError({
    message: 'Resource you are looking for Not Found',
    status: NOT_FOUND,
  });
  return Handler(err, req, res, next);
};

/**
 * Catch 429 ratelimit exceeded
 * @public
 */
exports.RateLimitHandler = (req, res, next) => {
  const err = new APIError({
    message: 'Too many requests, please try again later after sometime.',
    status: TOO_MANY_REQUESTS,
  });
  return Handler(err, req, res, next);
};
