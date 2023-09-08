const express = require("express");
const router = express.Router();
const ctrl = require("../../controlers/auth");
const { validateContact, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/users");

router.post(
  "/register",
  validateContact(schemas.usersSchemaJoi),
  ctrl.register
);

router.post("/login", validateContact(schemas.usersSchemaJoi), ctrl.login);

router.get("/current", authenticate, ctrl.current);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateContact(schemas.usersSchemaJoi), ctrl.updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
