const responseHandler = (message, statusCode, data, hasError) => {
  return {
    statusCode: statusCode || 200,
    hasError: hasError || false,
    data ,
    message: message || null,
  };
};

module.exports = responseHandler;