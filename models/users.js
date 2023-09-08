const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;

const usersSchemaMongoose = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

const usersSchemaJoi = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "Set password for user",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "Email is required",
  }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
  token: Joi.string(),
});

const schemas = {
  usersSchemaJoi,
};

usersSchemaMongoose.post("save", handleMongooseError);

const User = model("user", usersSchemaMongoose);

module.exports = { User, schemas };
