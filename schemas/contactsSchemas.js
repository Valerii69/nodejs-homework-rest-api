const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .alphanum()
    .required()
    .messages({ "any.required": `missing required name field` }),
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({ "any.required": `missing required email field` }),
  phone: Joi.number()
    .required()
    .messages({ "any.required": `missing required phone field` }),
})
  .or("name", "email", "phone")
  .messages({ "object.missing": `missing fields` });
// favorite: Joi.boolean()
//   .required()
//   .messages({ "object.unknown": `unknown field` }),
// function validate(addSchema, object) {
//   var result = addSchema.validate(object);

//   if (result.errors) {
//     // You have everything Joi uses for messages at your disposal in result.errors.details
//     return i18n.transform(result.errors);
//   }

//   return true;
// }

// .messages({ "any.required": `missing fields` });

// const updateContactSchema = Joi.object({
//   name: Joi.string().optional().required(),
//   email: Joi.string().optional().required(),
//   phone: Joi.string().optional().required(),
// });

// external((obj) => {
//   if (!obj.name || !obj.email || !obj.phone) {
//     throw new Error("missing fields");
//   }
// });

module.exports = {
  addSchema,
  // updateContactSchema,
};
