const express = require("express");
const router = express.Router();
const { validateBody, auth, upload } = require("../../middlewares");
const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");

const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validateBody(schemas.registerSchema),
  ctrl.registerUser
);

router.post(
  "/login",
  jsonParser,
  validateBody(schemas.loginSchema),
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
