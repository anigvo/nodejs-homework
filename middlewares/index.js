const { validateContact, validateUpdateFavorite } = require("./validation");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");

module.exports = {
  validateContact,
  validateUpdateFavorite,
  isValidId,
  authenticate,
};
