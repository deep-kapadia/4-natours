const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

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

const port = 3000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
