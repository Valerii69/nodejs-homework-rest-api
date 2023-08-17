// const messages = {
//   // 200: "contact deleted ",
//   // 202: "contact updated",
//   204: "contact not found",
//   400: "missing fields",
//   404: "Not Found",
// };

const httpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = httpError;
