// import { number } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const contact = new Schema({
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
    required: true,
    min: 5,
    max: 15,
  },
});

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
