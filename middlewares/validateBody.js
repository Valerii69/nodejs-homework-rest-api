// const express = require("express");
const { HttpError } = require("../helpers");
// const router = express.Router();

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const keys = Object.keys(req.body);
    if (req.method === "PUT" && keys.length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }
    if (req.method === "PATCH" && keys.length === 0) {
      return res.status(400).json({ message: "Missing field favorite" });
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
