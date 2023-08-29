const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const router = require("./api/index.js");

const app = express();
// const router = require("./api/index");

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.use((__, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 8080;
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

const connection = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
