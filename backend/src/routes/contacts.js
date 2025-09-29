import { Router } from 'express';
import { listContacts, createContact, updateContact, deleteContact } from '../controllers/contactController.js';
import { auth } from '../middleware/auth.js';

const router = Router();
router.use(auth);
router.get('/', listContacts);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
