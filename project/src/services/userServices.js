const md5 = require('md5');
const Joi = require('@hapi/joi');
const User = require('../models/userSchema');
const errorConstructor = require('../utils/errorConstructor');
const {generateToken} = require('../api/authService');
const {createWallet} = require('./walletServices');
const {getCurrency} = require('../api/api');
const {badRequest, conflict} = require('../utils/statusCode');

const userSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(255).required(),
});

const userValidation = (name, email, password) => {
  const {error} = userSchema.validate({name, email, password});
  if (error) throw errorConstructor(badRequest, error.message);
};

const registerUserService = async (bodyRequest) => {
  const {name, email, password, currency: incomeCurrency} = bodyRequest;
  userValidation(name, email, password);
  const passwordEncrypted = md5(password);

  const userAlreadyExists = await User.findOne({email});
  const allCurrency = await getCurrency();

  const findCurrency = allCurrency.find(
      (currency) => currency === incomeCurrency);

  if (userAlreadyExists) {
    throw errorConstructor(conflict, 'User already exists');
  }

  if (!findCurrency) {
    throw errorConstructor(badRequest, 'Currency not found');
  }

  const {id} = await User.create({
    name, email, password: passwordEncrypted});
  const wallet = await createWallet(id, 0, incomeCurrency);

  const token = generateToken({id, name});
  return {
    user: {id, name, token},
    wallet,
  };
};

module.exports = {
  registerUserService,
};
