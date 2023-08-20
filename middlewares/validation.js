const contactSchema = require("../schemas/contacts");
const { CreateHttpError } = require("../helpers");

const validateContact = (status) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw CreateHttpError(status, "Missing fields");
  }
  const { error } = contactSchema.validate(req.body);
  if (error) {
    const errorField = error.details
      .map((detail) => {
        return detail.context.label;
      })
      .join(", ");
    throw CreateHttpError(status, `Missing required ${errorField} field`);
  }
  next();
};

module.exports = { validateContact };
