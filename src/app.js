require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser')
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const PORT = process.env.PORT || 3000;
// init app
const app = express();
// set security HTTP headers
app.use(helmet());

// set morgan
app.use(morgan('common'));
// parse json request body
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser(process.env.COOKIE_NAME)) 
// enable cors
app.use(cors());
app.options('*', cors());

app.use('/api/swimmingpool/v1',routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
