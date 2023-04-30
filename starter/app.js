/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

console.log('tset 1', process.env.NODE_ENV === 'Development');

if (process.env.NODE_ENV === 'Development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Middleware

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  console.log('Time added');
  req.requestTime = new Date().toISOString();
  next();
});

//Route Handler

//Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//Server Start

module.exports = app;
