const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const moment = require("moment");
const fs = require("fs/promises");

// const path = require("path");
// const messages = require("httpErrors");

const contactsRouter = require("./routes/api/contacts");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((__, res, _) => {
  res.status(404).json({ message: "Not found" });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });

  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile(" ./public/server.log ", `\n${method}, ${url}, ${date}`);
  next();
});

module.exports = app;
