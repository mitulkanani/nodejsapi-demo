const { Types: { ObjectId } } = require('mongoose');
const path = require('path');

const APIError = require('./APIErrors');
const { UNAUTHORIZED } = require('./http-status');

exports.ValidateID = (id) => ObjectId.isValid(id);

const obj = {
  message: 'Unauthorized',
  status: UNAUTHORIZED,
};

const JwtError = (error) => {
  switch (error) {
    case 'jwt expired':
      obj.message = 'Your auth token is expired, Please Login again';
      break;
    case 'No auth token':
      obj.message = 'Please provide an auth token';
      break;
    case 'invalid signature':
      obj.message = 'Invalid auth token provided';
      break;
    default:
      obj.message = error.message;
      break;
  }
};

exports.JwtError = (error) => {
  const msg = error ? error.message : 'No Case';
  JwtError(msg);
  return new APIError(obj);
};

exports.UploadFile = (files) => new Promise((resolve, reject) => {
  files.mv(`${path.join(__dirname, '../public', files.name)}`, (err) => {
    if (err) {
      reject(new APIError({ status: 500, message: 'Error while uploading file' }));
    }
    resolve(files.name);
  });
});
