/* eslint-disable new-cap */
const express = require('express');
const {loginController} = require('../../controllers/loginControllers');
const loginRoute = express.Router();

loginRoute.post('/create', loginController);

module.exports = loginRoute;
