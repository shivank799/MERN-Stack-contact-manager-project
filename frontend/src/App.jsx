import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Contacts from './components/Contacts.jsx';
import { getToken, logout } from './services/auth.js';

function Nav() {
  const token = getToken();
  return (
    <nav style={{display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd'}}>
      <Link to="/">Contacts</Link>
      {!token && <Link to="/login">Login</Link>}
      {!token && <Link to="/register">Register</Link>}
      {token && <button onClick={() => { logout(); window.location.href='/login'; }}>Logout</button>}
    </nav>
  );
}

function Protected({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div>
      <Nav />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Protected><Contacts /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}
