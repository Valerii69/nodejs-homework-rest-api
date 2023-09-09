const isValidId = require("./isValidId");
const validateBody = require("./validateBody");
const auth = require("./authenticates");
const upload = require("./upload");

module.exports = {
  isValidId,
  validateBody,
  auth,
  upload,
};
