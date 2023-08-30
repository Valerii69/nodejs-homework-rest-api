const {
  get,
  getById,
  create,
  update,
  updateStatusContact,
  remove,
} = require("../controller/contactsController.js");

const express = require("express");
// const jsonParser = express.json();

const router = express.Router();

router.get("/contacts", get);

router.get("/contacts/:id", getById);

router.post("/contacts", create);

router.put("/contacts/:id", update);

router.patch("/contacts/:id/favorite", updateStatusContact);

router.delete("/contacts/:id", remove);

module.exports = router;
