/* eslint-disable new-cap */
const express = require('express');
const {getWalletController,
  updateWalletController,
  walletCurrencyConvertController,
} = require('../../controllers/walletControllers');
const userRouter = express.Router();

userRouter.get('/:id', getWalletController);
userRouter.put('/:id', updateWalletController);
userRouter.post('/:id/convert', walletCurrencyConvertController);


module.exports = userRouter;
