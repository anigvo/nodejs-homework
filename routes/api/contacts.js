const express = require("express");
const router = express.Router();
const ctrl = require("../../controlers/contacts");
const {
  validateContact,
  isValidId,
  validateUpdateFavorite,
} = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateContact(schemas.contactSchemaJoi), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateContact(schemas.contactSchemaJoi),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateUpdateFavorite(schemas.updateFavoriteSchemaJoi),
  ctrl.updateStatusContact
);

module.exports = router;
