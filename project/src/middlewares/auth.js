const {verifyToken} = require('../api/authService');
const {unauthorized} = require('../utils/statusCode');
const {errorConstructor} = require('../utils/errorConstructor');

module.exports = async (req, _res, next) => {
  try {
    const {authorization} = req.headers;

    if (!authorization) {
      throw errorConstructor(unauthorized, 'Token not found');
    }

    const user = verifyToken(authorization);
    if (!user) throw errorConstructor(unauthorized, 'Expired or invalid token');
    req.user = user;
    next();
  } catch (error) {
    console.log('FALHA AUTH');
    next(error);
  }
};
