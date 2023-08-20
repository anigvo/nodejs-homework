const express = require("express");
const router = express.Router();
const ctrl = require("../../controlers/contacts");
const { validateContact } = require("../../middlewares/validation");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateContact(400), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateContact(400), ctrl.updateContact);

module.exports = router;
