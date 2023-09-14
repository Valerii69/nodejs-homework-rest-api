const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, FROM_EMAIL_BOX } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: FROM_EMAIL_BOX };
  await sgMail.send(email);
  console.log("Email sent");
  return true;
};

module.exports = sendEmail;
