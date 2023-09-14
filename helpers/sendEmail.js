const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, FROM_EMAIL_BOX } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const mail = { ...data, from: FROM_EMAIL_BOX };
  await sgMail.send(mail);
  return true;
};

module.exports = sendMail;
