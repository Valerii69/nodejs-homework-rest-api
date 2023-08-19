const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

// const errorMessages = {
//   required: "missing required",
// };

// const addSchema = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .max(20)
//     .required()
//     .error(() => {
//       return { message: ` ${errorMessages} "Name field" ` };
//     }),
//   email: Joi.string()
//     .required()
//     .error(() => {
//       return { message: ` ${errorMessages} "Email field"` };
//     }),
//   phone: Joi.string()
//     .required()
//     .error(() => {
//       return { message: ` ${errorMessages} "Phone field"` };
//     }),
//   // favorite: Joi.boolean(),
// });

// const updateContactSchema = Joi.object({
//   name: Joi.string().optional().required(),
//   email: Joi.string().optional().required(),
//   phone: Joi.string().optional().required(),
// });
// // .or("name", "email", "phone");

module.exports = {
  addSchema,
  // updateContactSchema,
};