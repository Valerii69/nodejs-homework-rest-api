const mongoose = require("mongoose");

const { Schema, model } = mongoose;
// const { Schema, model } = require("mongoose");
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
      // default: null,
    },
    avatarURL: {
      type: String,
      required: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
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
  subscription: Joi.string()
    .valid(...subscriptions)
    .default("starter"),
  token: Joi.string().default(null),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).trim().required().messages({
    "any.required": "missing required email field",
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().pattern(passRegex).min(6).required().messages({
    "any.required": "missed required password field.",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "missed required email field.",
  }),
  // subscription: Joi.string().valid(...subscriptions),
});

const updateStatusSchema = Joi.object({
  subscription: Joi.string()
    .trim()
    .valid(...subscriptions)
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateStatusSchema,
  // verifyEmailSchema,
  emailSchema,
};
const User = model("user", userSchema);

module.exports = { User, schemas };
