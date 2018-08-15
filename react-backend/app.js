var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require("firebase");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groceryTripRouter = require('./routes/groceryListController');

var db = require('./models');

var app = express();
var PORT = process.env.PORT || 3001;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/groceryTrip', groceryTripRouter);

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

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
// var config = {
//   apiKey: "AIzaSyBe4LpKKm48PuMtTsaPmMPTfK4JXTnMxYA",
//   authDomain: "supreme-eureka.firebaseapp.com",
//   databaseURL: "https://supreme-eureka.firebaseio.com"
// };

// firebase.initializeApp(config);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT)
  });
});

module.exports = app;
