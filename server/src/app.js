const express = require('express');
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests, please try again later.',
})


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(xssClean());
app.use(rateLimiter);





app.get('/test', (req, res) => {
  res.status(200).send({
    message: 'Your Api Testing is Working!'
  });
});

app.get('/api/user', (req, res) => {
  res.status(200).send({
    message: "User profile is returned"
  })
})

// client error handling
app.use((req, res, next) => {
  next(createError(404, 'route not found'));
})

// server error handling -- all the errors
app.use((err, req, res, next) => {
  return res.status(err.status || 500 ).json({
    success: false,
    message: err.message,
  })
})


module.exports = app;