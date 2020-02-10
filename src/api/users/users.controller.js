const { Register, Login } = require('./users.service');
const { CREATED, OK } = require('../../utils/http-status');

exports.register = async (req, res, next) => {
  try {
    const data = await Register(req.body);
    res.status(CREATED).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await Login(req.body);
    res.status(OK).json({ data });
  } catch (err) {
    next(err);
  }
};
