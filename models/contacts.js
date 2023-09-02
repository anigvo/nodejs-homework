const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactSchemaMongoose = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const contactSchemaJoi = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
  }),
  favorite: Joi.boolean().default(false),
});

const updateFavoriteSchemaJoi = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing favorite field",
  }),
});

const schemas = {
  contactSchemaJoi,
  updateFavoriteSchemaJoi,
};

contactSchemaMongoose.post("save", handleMongooseError);

const Contact = model("contacts", contactSchemaMongoose);

module.exports = { Contact, schemas };
