const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();

    await User.findById(id);
    if (!_id) {
      throw HttpError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

// console.log(User);
module.exports = logoutUser;
