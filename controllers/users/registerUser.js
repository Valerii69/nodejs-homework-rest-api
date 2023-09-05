const bcrypt = require("bcrypt");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ email }).exec();

  if (!user === null) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = registerUser;
