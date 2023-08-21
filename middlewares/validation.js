const contactSchema = require("../schemas/contacts");
const { CreateHttpError } = require("../helpers");

const validateContact = (status) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw CreateHttpError(status, "Missing fields");
  }
  const { error } = contactSchema.validate(req.body);
  if (error) {
    console.log(error.message)
    throw CreateHttpError(status, error.message);
  }
  next();
};

module.exports = { validateContact };
