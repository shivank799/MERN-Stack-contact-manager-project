import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct way for React 18 and above
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Ensure the root element is correct
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Correct React 18+ API

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
