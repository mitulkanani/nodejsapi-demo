const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const compress = require('compression');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

const { ErrorHandler, ConvertError, NotFound } = require('../middleware/error');
const { Jwt } = require('./passport');

/**
 * Instantiate Express Framwork
 * @public
 */
const app = express();

// Mount BodyParser middleware will append body of request to req.body
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

// Static assets directory setup
app.use(express.static(path.join(__dirname, '../public')));

// Gzip Compression
app.use(compress());

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Enable authentication
app.use(passport.initialize());
passport.use('jwt', Jwt);

// Mounting api routing
app.use('/api/v1', require('../api/routes'));

// If error is not an instanceOf APIError, convert it.
app.use(ConvertError);

// Catch 404 and forward to error handler
app.use(NotFound);

// Error handler, send stacktrace only during development
app.use(ErrorHandler);

module.exports = app;
