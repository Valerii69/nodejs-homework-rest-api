const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, auth } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrl.listContacts);

router.get("/:contactId", auth, isValidId, ctrl.getContactById);

router.post("/", auth, validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", auth, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  auth,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
