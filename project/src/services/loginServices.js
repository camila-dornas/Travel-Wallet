const User = require('../models/userSchema');
const md5 = require('md5');
const Joi = require('@hapi/joi');
const errorConstructor = require('../utils/errorConstructor');
const {badRequest, notFound} = require('../utils/statusCode');
const {generateToken} = require('../api/authService');

const loginSchema = Joi.object({
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(255).required(),
});

const loginValidation = (user) => {
  const {error} = loginSchema.validate({...user});
  if (error) throw errorConstructor(badRequest, error.message);
};

const loginService = async (requestUser) => {
  loginValidation(requestUser);
  const {email: emailRequest, password: passwordRequest} = requestUser;
  const foundUser = await User.findOne({email: emailRequest});
  const encryptedPassword = md5(passwordRequest);

  if (!foundUser || encryptedPassword !== foundUser.password) {
    throw errorConstructor(notFound, 'e-mail or password is incorrect');
  }
  const {name, email, id} = foundUser;
  const token = generateToken({name, email, id});
  return {token, name, email, id};
};

module.exports = {
  loginService,
};
