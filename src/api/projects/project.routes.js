const express = require('express');

const { create, getProjects } = require('./project.controller');
const { Create } = require('./project.validations');
const { Authorize } = require('../../middleware/auth');

const app = express.Router();


app.route('/').post(Authorize(), Create, create);
app.route('/').get(Authorize(), getProjects);

module.exports = app;
