const md5 = require('md5');
const Joi = require('@hapi/joi');
const User = require('../models/userSchema');
const errorConstructor = require('../utils/errorConstructor');
const {generateToken} = require('../api/authService');
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
  const {name, email, password} = bodyRequest;
  userValidation(name, email, password);
  const passwordEncrypted = md5(password);
  const userAlreadyExists = await User.findOne({email});

  if (userAlreadyExists) {
    throw errorConstructor(conflict, 'User already exists');
  }
  const {id} = await User.create({
    name, email, password: passwordEncrypted});
  const token = generateToken({id, name});
  return {
    id,
    name,
    token,
  };
};

module.exports = {
  registerUserService,
};
