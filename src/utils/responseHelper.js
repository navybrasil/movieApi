const sendResponse = (response, statusCode, data) => {
  return response.status(statusCode).json({
    status: "success",
    data,
  });
};

const sendErrorResponse = (response, statusCode, message) => {
  return response.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = { sendResponse, sendErrorResponse };
