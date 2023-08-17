const httpError = require("../helpers/httpErrorsHandlers");

const validateBody = (addSchema) => {
  const func = (req, _, next) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
