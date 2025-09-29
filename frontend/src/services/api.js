import axios from 'axios';
import { getToken } from './auth.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function login(payload) { return api.post('/api/auth/login', payload); }
export function register(payload) { return api.post('/api/auth/register', payload); }

export function getContacts() { return api.get('/api/contacts'); }
export function createContact(payload) { return api.post('/api/contacts', payload); }
export function updateContact(id, payload) { return api.put(`/api/contacts/${id}`, payload); }
export function deleteContact(id) { return api.delete(`/api/contacts/${id}`); }

export default api;
