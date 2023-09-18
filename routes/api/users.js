const express = require("express");
const router = express.Router();
const {
  validateBody,
  auth,
  upload,
  validateMainBody,
} = require("../../middlewares");
const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");

const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validateMainBody(schemas.registerSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateMainBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post(
  "/login",
  jsonParser,
  validateMainBody(schemas.loginSchema),
  ctrl.loginUser
);

router.post("/logout", jsonParser, auth, ctrl.logoutUser);

router.get("/current", jsonParser, auth, ctrl.getCurrentUser);

router.patch(
  "/",
  jsonParser,
  auth,
  validateBody(schemas.updateStatusSchema),
  ctrl.updateStatusUser
);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.uploadAvatar);

module.exports = router;
