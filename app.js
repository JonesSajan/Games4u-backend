var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userAddress');
var categoryRouter=require('./routes/categories')
var subcategoryRouter=require('./routes/subcategory')
var termsRouter=require('./routes/terms')
var adminRouter=require('./routes/admin')
var gameRouter=require('./routes/game')
var accessoriesRouter=require('./routes/accessories')
var accessorypictureRouter=require('./routes/accessorypicture')
var documentRouter=require('./routes/document')
var subcategorypictureRouter=require('./routes/subcategorypicture')
var gamepictureRouter=require('./routes/gamepicture')
var usersdetailsRouter = require('./routes/usersdetail')
var usersAddressRouter = require('./routes/userAddress')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories',categoryRouter)
app.use('/subcategory',subcategoryRouter)
app.use('/game',gameRouter)
app.use('/accessories',accessoriesRouter)
app.use('/admin',adminRouter)
app.use('/terms',termsRouter)
app.use('/document',documentRouter)
app.use('/subcategorypicture',subcategorypictureRouter)
app.use('/accessorypicture',accessorypictureRouter)
app.use('/gamepicture',gamepictureRouter)
app.use('/userdetail' ,usersdetailsRouter)
app.use('/userAddress' ,usersAddressRouter)






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
