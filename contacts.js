const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}
async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((item) => item.id === contactId);
}

async function removeContact(contactId) {
  const idx = listContacts().findIndex((item) => item.id === contactId);
  if (idx === -1) return null;
  const removedContact = listContacts().splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(removedContact, null, 2));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contact = { id: uuidv4(), name, email, phone };
  await fs.appendFile(contactsPath, JSON.stringify(contact));
}
module.exports = {
  contactsPath,
  listContacts,
  removeContact,
  getContactById,
  addContact,
};
