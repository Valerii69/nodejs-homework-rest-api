const { User } = require("../../models/user");

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.token);
    const { email, subscription } = user;
    user.password = undefined;

    res.status(200).json({
      email: email,
      subscription: subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrentUser;
