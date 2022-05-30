const {registerUserService} = require('../services/userServices');
const {created} = require('../utils/statusCode');

const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(created).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserController,
};
