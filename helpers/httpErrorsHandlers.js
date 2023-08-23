const HttpError = (status, message) => {
  // console.log(HttpError);
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
