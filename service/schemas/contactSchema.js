// import { number } from "joi";
const mongoose = require("mongoose");
// const Joi = require("joi");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
      maxlength: 15,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
      min: 5,
      max: 15,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contact);

module.exports = { Contact };
