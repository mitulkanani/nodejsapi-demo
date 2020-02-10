const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const Jwt = require('jsonwebtoken');

const { JWT_EXPIRATION, JWT_SECRET } = require('../../config/env-vars');
const { CONFLICT } = require('../../utils/http-status');
const APIError = require('../../utils/APIErrors');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 8,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
}, { timestamps: true, versionKey: false });

UserSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

/**
 * User Model Methods
 */
UserSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'email', 'active', 'createdAt'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
  token() {
    const playload = {
      exp: moment().add(JWT_EXPIRATION, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return Jwt.sign(playload, JWT_SECRET);
  },
  async matchPassword(password) {
    return bcrypt.compare(password, this.password);
  },
});

UserSchema.statics = {
  checkDuplication(error) {
    if (error.code === 11000 && (error.name === 'BulkWriteError' || error.name === 'MongoError')) {
      return new APIError({ message: 'Email address already in use', status: CONFLICT });
    }
    return error;
  },
};

module.exports = model('users', UserSchema);
