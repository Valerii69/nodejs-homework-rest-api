const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const sendMail = require("../../helpers/sendEmail");
const crypto = require("uuid");
// const { HttpError } = require("../../helpers");
const { DB_HOST } = process.env;

const registerUser = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email }).exec();

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = crypto();
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      subscription,
      avatarURL,
    });
    const createEmail = (email, verificationToken) => {
      const mail = {
        to: email,
        subject: "Let is verify your email",
        html: `<a target="_blank" href="${DB_HOST}/users/verify/:${verificationToken}">Verify email</a>`,
      };

      return mail;
    };

    const mail = createEmail(email, verificationToken);
    await sendMail(mail);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
        verificationToken: newUser.verificationToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = registerUser;
