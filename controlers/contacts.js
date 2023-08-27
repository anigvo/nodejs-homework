const { Contact } = require("../models/contacts");
const { CreateHttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const data = await Contact.find();
  res.status(200).send(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw CreateHttpError(404, "Not found");
  }
  res.status(200).send(data);
};

const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).send(data);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndRemove(contactId);
  if (!data) {
    throw CreateHttpError(404, "Not found");
  }
  res.status(200).send({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw CreateHttpError(404, "Not found");
  }
  res.status(200).send(data);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw CreateHttpError(404, "Not found");
  }
  res.status(200).send(data);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
