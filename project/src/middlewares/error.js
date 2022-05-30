const {internalError} = require('../utils/library/statusCode');

module.exports = (error, _request, resolve, _next) => {
  if (error.status) {
    return resolve.status(error.status).json({error: {message: error.message}});
  }
  console.log(error);
  return resolve
      .status(internalError).json({error: {message: 'Internal Server Error'}});
};
