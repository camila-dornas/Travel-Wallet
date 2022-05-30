/* eslint-disable new-cap */
const express = require('express');
const {registerUserController} = require('../../controllers/userControllers');
const userRouter = express.Router();

userRouter.post('/register', registerUserController);

module.exports = userRouter;
