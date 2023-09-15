const { CreateHttpError } = require("../helpers");

const validateBody = (schema) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw CreateHttpError(400, "Missing fields");
  }
  const { error } = schema.validate(req.body);
  if (error) {
    throw CreateHttpError(400, error.message);
  }
  next();
};

const validateOneField = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw CreateHttpError(400, error.message);
  }
  next();
};

module.exports = { validateBody, validateOneField };
