const User = require('./user.model');
const APIError = require('../../utils/APIErrors');
const { NO_RECORD_FOUND, INVALID_CREDENTIALS } = require('../../utils/constants');
const { NOT_FOUND, UNAUTHORIZED } = require('../../utils/http-status');

exports.Register = async (data) => {
  try {
    const user = new User(data);
    const us = await user.save();
    return { user: us.transform(), token: us.token() };
  } catch (err) {
    throw User.checkDuplication(err);
  }
};

exports.Login = async (data) => {
  const { email, password } = data;
  const us = await User.findOne({ email }).exec();
  if (!us) throw new APIError({ message: NO_RECORD_FOUND, status: NOT_FOUND });
  if (!await us.matchPassword(password)) {
    throw new APIError({ message: INVALID_CREDENTIALS, status: UNAUTHORIZED });
  }
  return { user: us.transform(), token: us.token() };
};
