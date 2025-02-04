const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const updateStatusUser = require("./updateStatusUser");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const uploadAvatar = require("./uploadAvatar");

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateStatusUser: ctrlWrapper(updateStatusUser),
  uploadAvatar: ctrlWrapper(uploadAvatar),
};
