const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contactsSchemas");
const control = require("../../controllers/contactCtrl");

const router = express.Router();

router.get("/", control.getContactAll);

router.get("/:contactId", control.getContactById);

router.post("/", validateBody(schemas.addSchema), control.postContact);

router.delete("/:contactId", control.deletedContact);

router.put("/:contactId", validateBody(schemas.addSchema), control.putContact);

module.exports = router;
