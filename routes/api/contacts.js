const express = require("express");
const Joi = require("joi");
const { httpError } = require("../../helpers/httpErrorsHandlers");
const contacts = require("../../models/contacts");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (__, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (reg, res, next) => {
  try {
    const { contactId } = reg.params;
    const result = await contacts.listContacts(contactId);
    if (!result) {
      return next(httpError(404));
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const error = addSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.deleteContact(contactId);
    if (!result) {
      return next(httpError(404));
    }
    res.json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const error = addSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      return next(httpError(404));
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
