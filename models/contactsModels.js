const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const parseData = await fs.readFile(contactsPath);
  return JSON.parse(parseData);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find((el) => el.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = data.splice(data, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
};

const addContact = async (bodi) => {
  const data = await listContacts();
  const newContact = { id: `${crypto.randomUUID()}`, ...bodi };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const findIndex = data.findIndex((el) => el.id === contactId);
  if (findIndex === -1) {
    return null;
  }
  data[findIndex] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[findIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
