var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mongoose = require('mongoose');
//connect với mongodb
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
  //check connect
  mongoose.connection.on('connected',()=>{
    console.log("Connected to database mongodb @27017");
  });
  mongoose.connection.on('error',(err)=>{
      if(err){
        console.log('Error database connected:'+err);
      }
  });

  
 

var apiRouter = require('./routes/book');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/books', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-details/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-create', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-edit/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/users',express.static(path.join(__dirname,'dist/mean-angular6')));
app.use('/api', apiRouter);

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
  res.send(err.status);
});
const port =3000;
app.listen(port,()=>{
  console.log('Server started in port: '+port);
});

module.exports = app;
