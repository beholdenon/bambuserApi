var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
const fs = require('fs');
const cron = require("node-cron");
const https = require('https');

var indexRouter = require('./routes/index');
var bambuserRouter = require('./routes/bambuser');
var contentfulRouter = require('./routes/contentful');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bambuser', bambuserRouter);
app.use('/contentful', contentfulRouter);

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

cron.schedule('*/2 * * * *', async function () {
  axios.get('http://localhost:3000/bambuser/shows').then(function (response) {
    fs.writeFile("public/shows.json", JSON.stringify(response.data), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
      }
    });
  });

});

module.exports = app;
