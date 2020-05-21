var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const jwtMiddleware = require('express-jwt');

const Place = require('./models/Place');

const places = require('./routes/places');
const users = require('./routes/users');
const sessions = require('./routes/sessions');
const favorites = require('./routes/favorites');
const visits = require('./routes/visits');
const visitPlaces = require('./routes/visitsPlaces');
const applications = require('./routes/applications');

const db = require('./config/database');
const secrets = require('./config/secrets');

db.connect();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  jwtMiddleware({secret: secrets.jwtSecret})
    .unless({path: ['/sessions', '/users'], method: 'GET'})
)

app.use('/places', places);
app.use('/places', visitPlaces);
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/favorites', favorites);
app.use('/visits', visits);
app.use('/applications', applications);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
