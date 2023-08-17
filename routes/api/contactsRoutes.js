const express = require("express");

const ctrl = require("../../controllers/contactCtrl");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contactsShchemas");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.updateContactSchema),
  ctrl.updateContact
);

module.exports = router;
