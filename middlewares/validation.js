const { CreateHttpError } = require("../helpers");

const validateContact = (schema) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw CreateHttpError(400, "Missing fields");
  }
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error.message);
    throw CreateHttpError(400, error.message);
  }
  next();
};

const validateUpdateFavorite = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error.message);
    throw CreateHttpError(400, error.message);
  }
  next();
};

module.exports = { validateContact, validateUpdateFavorite };
