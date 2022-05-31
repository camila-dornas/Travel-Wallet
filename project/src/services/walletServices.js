const Wallet = require('../models/walletSchema');
const {convertCurrency} = require('../api/api');

const createWallet = async (userId, value, currency) => {
  const wallet = await Wallet.create({
    userId,
    value,
    currency,
  });
  return wallet;
};

const getWallet = async (userId) => {
  const wallet = await Wallet.findOne({userId});
  return wallet;
};

const updateWallet = async (userId, value, currency) => {
  const wallet = await Wallet
      .findOneAndUpdate({userId}, {value, currency}, {new: true});
  return wallet;
};

const walletCurrencyConvert = async (from, to, amount) => {
  const convert = await convertCurrency(from, to, amount);
  return {
    valueConvert: convert.conversion_result,
  };
};


module.exports = {
  createWallet,
  getWallet,
  updateWallet,
  walletCurrencyConvert,
};
