/* eslint-disable new-cap */
const express = require('express');
const {registerUserController} = require('../../controllers/userControllers');
const userRouter = express.Router();

// userRouter.get('/user', getAllUsersController);
userRouter.post('/register', registerUserController);
// userRouter.post('/register/admin',
// authMiddleware, registerUserWithRoleController);
// userRouter.delete('/user/:id', authMiddleware, deleteUserController);

module.exports = userRouter;
