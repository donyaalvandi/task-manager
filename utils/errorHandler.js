const customError = (message = "Internal error", statusCode = 500) => {
  const newError = new Error(message);
  newError.statusCode = statusCode;
  throw newError;
};

const errorMiddleware = (error, request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }
  const statusCode = error.statusCode || 500;
  console.error("Error:", error.message, "Status:", statusCode);
  response.status(statusCode).json({
    status: statusCode,
    message: error.message,
  });
};

module.exports = { customError, errorMiddleware };
