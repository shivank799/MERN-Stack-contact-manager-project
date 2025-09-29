import { Contact } from '../models/Contact.js';

export async function listContacts(req, res) {
  const contacts = await Contact.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(contacts);
}

export async function createContact(req, res) {
  const { name, email, phone, notes } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const contact = await Contact.create({ userId: req.user.id, name, email, phone, notes });
  res.status(201).json(contact);
}

export async function updateContact(req, res) {
  const id = req.params.id;
  const contact = await Contact.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.json(contact);
}

export async function deleteContact(req, res) {
  const id = req.params.id;
  const result = await Contact.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!result) return res.status(404).json({ message: 'Contact not found' });
  res.json({ ok: true });
}
