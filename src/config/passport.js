const { Strategy, ExtractJwt } = require('passport-jwt');

/**
 * App Imports
 */
const { JWT_SECRET } = require('../config/env-vars');
const User = require('../api/users/user.model');

const JwtOptions = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};


/**
 * Returns Callback function with user data if valid Token provided
 * Returns Callback function with Error if invalid data provided
 *
 * @param {Object} payload
 * @param {String} payload.sub _id of user
 * @param {Function} done Callback Functiom
 *
 * @returns {Function} done
 */
const JWT = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
};

exports.Jwt = new Strategy(JwtOptions, JWT);
