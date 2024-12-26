const AppError = require("../utils/AppError");

const notFoundHandler = (request, response, next) => {
  throw new AppError("Route not found", 404);
};

module.exports = notFoundHandler;
