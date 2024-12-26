const AppError = require("./AppError");
const validateRating = (rating) => {
  const numericRating = Number(rating);

  const MINIMUM_RATE = 1;
  const MAXIMUM_RATE = 5;

  const isRatingInValidRange =
    Number.isInteger(numericRating) &&
    numericRating >= MINIMUM_RATE &&
    numericRating <= MAXIMUM_RATE;

  if (!isRatingInValidRange) {
    throw new AppError("The rating must be an integer between 1 and 5.");
  }
};

module.exports = { validateRating };
