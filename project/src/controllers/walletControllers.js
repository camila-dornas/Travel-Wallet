const {getWallet, updateWallet,
  walletCurrencyConvert} = require('../services/walletServices');
const {success} = require('../utils/statusCode');

const getWalletController = async (req, res, next) => {
  try {
    const {id} = req.params;
    const wallet = await getWallet(id);
    return res.status(success).json(wallet);
  } catch (error) {
    next(error);
  }
};

const updateWalletController = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {value, currency} = req.body;
    const wallet = await updateWallet(id, value, currency);
    return res.status(success).json(wallet);
  } catch (error) {
    next(error);
  }
};

const walletCurrencyConvertController = async (req, res, next) => {
  try {
    const {from, to, amount} = req.body;
    const convert = await walletCurrencyConvert(from, to, amount);
    return res.status(success).json(convert);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWalletController,
  updateWalletController,
  walletCurrencyConvertController,
};
