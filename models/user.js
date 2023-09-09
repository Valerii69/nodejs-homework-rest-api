const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");
const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptions,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().pattern(passRegex).min(6).required().messages({
    "any.required": "missed required password field.",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "missed required email field.",
  }),
  subscription: Joi.string().valid(...subscriptions),
});

const loginSchema = Joi.object({
  password: Joi.string().pattern(passRegex).min(6).required().messages({
    "any.required": "missed required password field.",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "missed required email field.",
  }),
  subscription: Joi.string().valid(...subscriptions),
});

const updateStatusSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptions)
    .required(),
});

const User = model("user", userSchema);

const schemas = { registerSchema, loginSchema, updateStatusSchema };

module.exports = { User, schemas };
