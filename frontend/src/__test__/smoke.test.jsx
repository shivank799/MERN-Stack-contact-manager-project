import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import App from '../App.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('app renders', () => {
  it('renders login route without crashing', () => {
    render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
    expect(true).toBe(true);
  });
});
