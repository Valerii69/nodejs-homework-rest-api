// const service = require("../service"); // const ctrlWrapper = require("../helpers/controlWrapper");
const Contact = require("./schemas/contactSchema.js");

const getAllContacts = async () => {
  return Contact.find().exec();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id }).exec();
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone }).exec();
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true }).exec();
};

const removeContact = (id) => {
  return Contact.findByIdAndDelete({ _id: id }).exec();
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
