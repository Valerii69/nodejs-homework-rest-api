const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contactsSchemas");
const control = require("../../controllers/contactCtrl");

const router = express.Router();

router.get("/", control.getContactAll);

router.get("/:contactId", control.getContactById);

router.post("/", validateBody(schemas.addSchema), control.addContact);

router.delete("/:contactId", control.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  control.updateContact
);

module.exports = router;
