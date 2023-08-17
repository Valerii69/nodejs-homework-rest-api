const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .messages({ "any.required": `missing required name field` }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": `missing required email field` }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": `missing required phone field` }),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().optional().required(),
  email: Joi.string().optional().required(),
  phone: Joi.string().optional().required(),
}).or("name", "email", "phone");

module.exports = { addSchema, updateContactSchema };
