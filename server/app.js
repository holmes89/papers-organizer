let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
let bodyParser = require('body-parser')

let paperRouter = require('./routes/paper');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/api/papers', paperRouter);

module.exports = app;
