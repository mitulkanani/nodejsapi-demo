const passport = require('passport');
const { JwtError } = require('../utils/helper');

const handleJWT = (req, res, next) => async (err, user, info) => {
  const apiError = JwtError(err || info);
  if (err || !user) {
    return next(apiError);
  }
  req.user = user;
  return next();
};

exports.Authorize = () => (req, res, next) => passport.authenticate('jwt',
  { session: false },
  handleJWT(req, res, next))(req, res, next);
