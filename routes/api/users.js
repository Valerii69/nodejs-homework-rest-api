const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");

const router = express.Router();
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

router.post("/logout", jsonParser, authenticate, ctrl.logoutUser);

router.get("/current", jsonParser, authenticate, ctrl.getCurrentUser);

router.patch(
  "/",
  jsonParser,
  authenticate,
  validateBody(schemas.updateStatusSchema),
  ctrl.updateStatusUser
);

module.exports = router;
