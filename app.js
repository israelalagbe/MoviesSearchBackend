const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();


//User defined

const { env } = require('./helpers/env');
require('./config/mongoose');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
// require('./config/passport');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send({ debug: err && err.message, error: 'Something went wrong!, we are not quite sure what it is' });
}
app.use(errorHandler);

module.exports = app;
