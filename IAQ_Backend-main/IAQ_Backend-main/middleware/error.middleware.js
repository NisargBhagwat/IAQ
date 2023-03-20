const errorMiddleware = (error, req, res, next) => {
  try {
    const status = error.status || 500;
    const message = error.message || "Something Went Wrong";
    return res.status(status).json({
      statusCode: status,
      hasError: true,
      message,
      stack: error.stack || null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  errorMiddleware,
};
