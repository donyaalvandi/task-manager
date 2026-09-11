const customError = (message = "Internal error", statusCode = 500) => {
  const newError = new Error(message);
  newError.statusCode = statusCode;
  throw newError;
};

const errorMiddleWare = (error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  console.log("err:", error.message, statusCode);
  response.status(statusCode).json({
    status: statusCode,
    message: error.message,
  });
};

module.exports = { customError, errorMiddleWare };
