const express = require("express");
const router = express.Router();
const ctrl = require("../../controlers/contacts");
const {
  validateContact,
  isValidId,
  validateUpdateFavorite,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateContact(schemas.contactSchemaJoi),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateContact(schemas.contactSchemaJoi),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateUpdateFavorite(schemas.updateFavoriteSchemaJoi),
  ctrl.updateStatusContact
);

module.exports = router;
