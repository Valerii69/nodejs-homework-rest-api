const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const logoutUser = async (req, res) => {
  if (!req.user) {
    throw HttpError(401, "Not authorized");
  }
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.sendStatus(204);
};

module.exports = logoutUser;
