const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const { FROM_EMAIL_BOX, TO_EMAIL_BOX } = process.env;

// const email = {
//   to: TO_EMAIL_BOX,
//   from: FROM_EMAIL_BOX, // Use the email address or domain you verified above
//   subject: "Test Email Node",
//   text: "Test email with Node.js",
//   html: "<h1 style='color:#ff0000;'><strong>Test email</strong> from localhost:3000</h1>",
// };
// sgMail
//   .send(email)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const path = require("node:path");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/avatars", express.static(path.join(__dirname, "public/avatars")));

app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

module.exports = app;
