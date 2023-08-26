const contactsModels = require("../models/contactsModels");
const HttpError = require("../helpers/httpErrorsHandlers");
const ctrlWrapper = require("../helpers/controlWrapper");

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

const deletedContact = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await contactsModels.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const postContact = async (req, res, _) => {
  const result = await contactsModels.addContact(req.body);
  res.status(201).json(result);
};

const putContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactsModels.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};
module.exports = {
  getContactAll: ctrlWrapper(getContactAll),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  putContact: ctrlWrapper(putContact),
  deletedContact: ctrlWrapper(deletedContact),
};
