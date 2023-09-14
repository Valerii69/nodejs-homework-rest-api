const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const sendEmail = require("../../helpers/");
const crypto = require("crypto");
const { BASE_URL } = process.env;

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = `${crypto.randomUUID()}`;

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      // subscription,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = (email, verificationToken) => {
      const mail = {
        to: email,
        subject: "Let is verify your email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click Verify email</a>`,
      };

      return mail;
    };

    // const mail = verifyEmail(email, verificationToken);

    await sendEmail(verifyEmail);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
        verificationToken: newUser.verificationToken,
      },
    });
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = registerUser;
