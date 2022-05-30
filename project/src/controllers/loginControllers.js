const {loginService} = require('../services/loginServices');
const {success} = require('../utils/statusCode');

const loginController = async (req, res, next) => {
  try {
    const token = await loginService(req.body);
    return res.status(success).json(token);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
};
