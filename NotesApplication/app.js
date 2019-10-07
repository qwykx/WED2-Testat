
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const app = express();
const routes = require('./routes/noteRoutes');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(routes);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
