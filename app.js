// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

//import routers
let indexRouter = require('./server/routes/index');
let surveyRouter = require('./server/routes/survey');

// database setup
let mongoose = require('mongoose');
let db = require('./server/config/db');

// connect to DB
mongoose.connect(db.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB...');
});

let app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));
//get resources from frontend build folder
app.use(express.static(__dirname + '/client/dist/freebirds-survey'));

//routing
// app.use('/api/v1', indexRouter);
app.use('/api/v1/surveys', surveyRouter);
app.get('/*', function (req, res) {
  res.sendFile(
    path.join(__dirname + '/client/dist/freebirds-survey/index.html')
  );
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;