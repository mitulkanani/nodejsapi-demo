
class APIError extends Error {
  /**
    * Creates an API error.
    * @param {String} message - Error message.
    * @param {Array} errors - Array of validation fields Errors.
    * @param {Number} status - HTTP status code of error.
    * @param {Boolean} isPublic - Whether the message should be visible to user or not.
    */
  constructor({
    message,
    stack,
    errors,
    status = 500,
    isPublic = false,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.stack = stack;
  }
}

module.exports = APIError;
