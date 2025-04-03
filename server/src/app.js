const express = require('express');
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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