const contactsModels = require("../models/contactsModels");
const { HttpError, ctrlWrapper } = require("../helpers");

const getContactAll = async (_, res, __) => {
  const result = await contactsModels.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await contactsModels.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res, _) => {
  const result = await contactsModels.addContact(req.body);
  res.status(201).json(result);
};
const removeContact = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await contactsModels.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Сontact deleted" });
};

const updateContact = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await contactsModels.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getContactAll: ctrlWrapper(getContactAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
