const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
// const { HttpError } = require("../../helpers");
const { sendEmail } = require("../../helpers/");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const register = async (req, res, _) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    // subscription,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      // avatarURL: newUser.avatarURL,
      // verificationToken: newUser.verificationToken,
    },
  });
};

module.exports = register;
