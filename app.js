const createError = require('http-errors');
const express = require('express');
const cors = require('cors');

const path = require('path');
require('dotenv').config();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const {PORT, NODE_ENV} = process.env;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const videoRouter = require('./routes/video');
const fileRouter= require('./routes/files');
const likeRouter = require('./routes/likes');
const requestlogger = require('./middleware/requestlogger')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({type: 'application/json'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));



//const whitelist = [ 'http://localhost:3024' , 'https://parentcritic.com']

app.use(cors({
  "origin": true,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
  "credentials":true
}))
app.use(requestlogger);
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/videos', videoRouter);
app.use('/api/files', fileRouter);
app.use('/api/like', likeRouter);
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
  res.render('error');
});

module.exports = app;
