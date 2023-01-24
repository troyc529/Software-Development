var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helpers = require('./components/hbsHelpers');
require("dotenv").config();
const cors = require("cors");

global.__basedir = __dirname;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require("./routes/posts");
const passport = require('passport');
var app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'), (err) => {});


//cors
var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// component helpers setup
for (let helper in helpers) {
    hbs.registerHelper(helper, helpers[helper]);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session cookie
app.use(require("./middleware/session"));
app.use(passport.initialize())
app.use(passport.session());
//added code
app.set('views',__dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/posts", postsRouter);
app.use('/public', express.static('public'));
app.use("/api/login", require("./routes/login"), require("./middleware/ApiErrorHandler"));
app.use("/api/users", require("./routes/users"), require("./middleware/ApiErrorHandler"));


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
  res.render('error.hbs');
});


module.exports = app;