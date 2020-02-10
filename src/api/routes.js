const express = require('express');

const app = express.Router();

app.use('/auth', require('./users/user.routes'));

app.use('/project', require('./projects/project.routes'));

module.exports = app;
