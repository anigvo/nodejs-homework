const { isValidObjectId } = require("mongoose");
const { CreateHttpError } = require("../helpers/");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(CreateHttpError(400, `${contactId} is not valid ID`));
  }
    next()
};

module.exports = isValidId;