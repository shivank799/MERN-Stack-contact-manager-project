import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api.js';
import { saveAuth } from '../services/auth.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await login({ email, password });
      saveAuth(res.data);
      navigate('/');
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed');
    }
  }

  return (
    <form onSubmit={onSubmit} style={{maxWidth:400}}>
      <h2>Login</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <label>Email</label>
      <input value={email} onChange={e=>setEmail(e.target.value)} required/>
      <label>Password</label>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
      <button type="submit">Sign in</button>
    </form>
  );
}
