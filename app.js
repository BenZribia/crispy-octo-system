var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cvRouter = require('./routes/cvRouter');

mongoose.connect('mongodb+srv://abdou:abdou123@cluster0-j490m.mongodb.net/<dbname>?retryWrites=true&w=majority', 
                  { useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
          console.log('Connected Successfully to mongodb!');
        })
        .catch((err)=>{
          console.log(err);
        });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// EJS
app.use(expressLayout);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', cvRouter);
app.use('/users', usersRouter);

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
  //res.render('error');
});

module.exports = app;
