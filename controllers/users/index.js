const register = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const updateStatusUser = require("./updateStatusUser");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const uploadAvatar = require("./uploadAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register: ctrlWrapper(register),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateStatusUser: ctrlWrapper(updateStatusUser),
  uploadAvatar: ctrlWrapper(uploadAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
