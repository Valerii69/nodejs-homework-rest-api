const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const parseData = await fs.readFile(contactsPath);
  return JSON.parse(parseData);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  return findContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  if (findContact === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(findContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

const addContact = async (bodi) => {
  const contacts = await listContacts();
  const newContact = {
    id: `${crypto.randomUUID()}`,
    ...bodi,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  if (findContact === -1) {
    return null;
  }
  contacts[findContact] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[findContact];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
