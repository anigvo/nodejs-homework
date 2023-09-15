const express = require("express");
const router = express.Router();
const ctrl = require("../../controlers/auth");
const { validateBody, validateOneField, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/users");

router.post(
  "/register",
  validateBody(schemas.usersSchemaJoi),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateOneField(schemas.verifyEmailSchemaJoi),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.usersSchemaJoi), ctrl.login);

router.get("/current", authenticate, ctrl.current);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.usersSchemaJoi),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
