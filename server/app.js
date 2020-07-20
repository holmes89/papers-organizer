let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require('mongoose');

let paperRouter = require('./routes/paper');

let isProduction = process.env.NODE_ENV === 'production';

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useFindAndModify: false });
} else {
  mongoose.connect('mongodb://localhost/papers',  {useNewUrlParser: true, useFindAndModify: false });
  mongoose.set('debug', true);
}

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/papers', paperRouter);

module.exports = app;
