const express = require('express');
const { getUsers } = require('../controllers/userController');
const userRouter = express.Router();


userRouter.get('/', getUsers);
userRouter.get('/profile', (req, res) => {
  res.status(200).send({
    message: "Users were returned",
  })
});


module.exports = userRouter;