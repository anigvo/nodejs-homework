const { validateContact, validateUpdateFavorite } = require("./validation");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateContact,
  validateUpdateFavorite,
  isValidId,
  authenticate,
  upload,
};
