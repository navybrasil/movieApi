const { validateEmail } = require("../utils/userValidations");
const AppError = require("../utils/AppError");

const validateUser = (request, response, next) => {
  const { email } = request.body;

  if (email && !validateEmail(email)) {
    throw new AppError("Invalid email format.");
  }

  next();
};

module.exports = { validateUser };
