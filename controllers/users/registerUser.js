const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
// const { HttpError } = require("../../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  try {
    const user = await User.findOne({ email }).exec();

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email,
        subscription: newUser.subscription,
        avatarURL,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = registerUser;
