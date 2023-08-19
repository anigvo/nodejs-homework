const joi = require("joi");

const postContactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
});

const putContactSchema = joi
  .object({
    name: joi.string(),
    email: joi.string().email(),
    phone: joi.string(),
  })
  .or("name", "email", "phone");

module.exports = { postContactSchema, putContactSchema };
