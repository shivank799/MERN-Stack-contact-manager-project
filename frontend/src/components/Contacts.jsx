import React, { useEffect, useState } from 'react';
import { getContacts, createContact, updateContact, deleteContact } from '../services/api.js';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name:'', email:'', phone:'', notes:'' });

  async function refresh() {
    const res = await getContacts();
    setContacts(res.data);
  }

  useEffect(() => { refresh(); }, []);

  async function onCreate(e) {
    e.preventDefault();
    if (!form.name) return;
    await createContact(form);
    setForm({ name:'', email:'', phone:'', notes:'' });
    refresh();
  }

  async function onUpdate(id, patch) {
    await updateContact(id, patch);
    refresh();
  }

  async function onDelete(id) {
    await deleteContact(id);
    refresh();
  }

  return (
    <div>
      <h2>My Contacts</h2>
      <form onSubmit={onCreate} style={{display:'grid', gap:8, maxWidth:600, gridTemplateColumns:'1fr 1fr'}}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <input placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}/>
        <button type="submit" style={{gridColumn:'1 / span 2'}}>Add Contact</button>
      </form>

      <ul>
        {contacts.map(c => (
          <li key={c._id} style={{border:'1px solid #ddd', padding:10, margin:'10px 0'}}>
            <b>{c.name}</b> — {c.email || '—'} — {c.phone || '—'}<br/>
            {c.notes && <small>{c.notes}</small>}<br/>
            <button onClick={()=>onUpdate(c._id, { name: prompt('New name', c.name) || c.name })}>Rename</button>
            <button onClick={()=>onDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
