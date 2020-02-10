const express = require('express');

const { register, login } = require('./users.controller');
const { Login, Register } = require('./user.validation');

const app = express.Router();


app.route('/register').post(Register, register);
app.route('/login').post(Login, login);

module.exports = app;
