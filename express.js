const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

const Auth = require('./server/routes/auth');
const JwtVerifier = require('./server/middlware/json-verifier');
const Product = require('./server/routes/product.js');
const Cart = require('./server/routes/cart.js');
const ImageUpload = require('./server/routes/imageUpload.js')
const Purchase = require('./server/routes/purchase.js')
const Category = require('./server/routes/categories.js')

const oldApp = express();

oldApp.use(logger('dev'));
oldApp.use(express.json());
oldApp.use(express.urlencoded({ extended: false }));
oldApp.use(express.static(path.join(__dirname, 'public')));

const auth = new Auth();
const product = new Product();
const cart = new Cart();
const upload = new ImageUpload();
const purchase = new Purchase();
const category = new Category();



oldApp.use('/auth', auth.router);
//oldApp.use('/auth', (req, res) => {
 // res.end('done');

//});

oldApp.use ( async (...args) => (new  JwtVerifier()).handler(...args));

oldApp.use('/product', product.router);
oldApp.use('/cart', cart.router);
oldApp.use('/image', upload.router);
oldApp.use('/purchase', purchase.router);
oldApp.use('/category', category.router);



oldApp.get ('/shop', (req, res) => {
  res.end('hello');
})

// catch 404 and forward to error handler
oldApp.use(function(req, res, next) {
  next(createError(404));
});

// error handler
oldApp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.end(err.message);
  //res.render('error');
});

module.exports = oldApp;
