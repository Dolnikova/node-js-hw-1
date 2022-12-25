const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");
// const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const contactsList = JSON.parse(await fs.readFile(contactsPath));
    console.table(contactsList);
    return contactsList;
  } catch (error) {
    throw error.message;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find((item) => item.id === contactId);
    console.log(foundContact);
    return foundContact;
  } catch (error) {
    throw error.message;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) return null;
    const removedContact = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(removedContact);
    return removedContact;
  } catch (error) {
    throw error.message;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const contact = { id: uuidv4(), name, email, phone };
    contacts.push(contact);
    const addedContact = await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts)
    );
    console.log(contact);
    return addedContact;
  } catch (error) {
    throw error.message;
  }
}
module.exports = {
  contactsPath,
  listContacts,
  removeContact,
  getContactById,
  addContact,
};
