const success = (res, data, message = "Request successful", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    error: null,
  });
};

const failure = (res, message = "Request failed", statusCode = 500, details = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error: {
      message,
      details,
    },
  });
};

module.exports = {
  success,
  failure,
};