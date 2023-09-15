const express = require("express");
const router = express.Router();
const ctrl = require("../../controlers/contacts");
const {
  validateBody,
  validateOneField,
  isValidId,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactSchemaJoi),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactSchemaJoi),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateOneField(schemas.updateFavoriteSchemaJoi),
  ctrl.updateStatusContact
);

module.exports = router;
