const contactCtrl = require("../controller/contactsController.js");

const express = require("express");
// const jsonParser = express.json();

const router = express.Router();

router.get("/contacts", contactCtrl.get);

router.get("/contacts/:id", contactCtrl.getById);

router.post("/contacts", contactCtrl.create);

router.put("/contacts/:id", contactCtrl.update);

router.patch("/contacts/:id/favorite", contactCtrl.updateStatusContact);

router.delete("/contacts/:id", contactCtrl.remove);

module.exports = router;
