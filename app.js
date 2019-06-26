var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');

var config = require('./routes/config');
var index = require('./routes/index');
var users = require('./routes/users');
var utils = require('./routes/util');
var files = require('./routes/files');
// db connection
// mongodb://127.0.0.1:27017/dbHanthanaDrive
// mongodb://sachi:sachi123@ds163918.mlab.com:63918/54fileshare
//mongodb://dbAdmin:hanthanadrive%40fosuop@127.0.0.1:27017/dbHanthanaDrive

mongoose.connect('mongodb://sachi:sachi123@ds163918.mlab.com:63918/54fileshare',{uri_decode_auth: true}, (err, db) => {
  if (err) return console.log(err);
});
global.db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  //set headers to allow cross origin request.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  next();
});

app.use('/api/upload', index);
app.use('/api/user', users);
app.use('/api/util', utils);
app.use('/api/file', files);

app.set('superSecret', config.secret);
// catch 404 and forward to error handler
app.use('*', function (req, res, next) {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
