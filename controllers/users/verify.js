const User = require("../../models/user");
const { HttpError } = require("../../helpers");
// const verificationToken = crypto.randomUUID();

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = User.findOne({ verificationToken });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });

    res.json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
