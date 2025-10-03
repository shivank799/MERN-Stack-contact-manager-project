/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // or '0.0.0.0' to listen on all addresses
    // port: 5173, // your port
    allowedHosts: 'all', // allow all hosts
  },
  preview: {
     host: true,
     allowedHosts: 'all', // allow all hosts
    // port: 5173 
  },
  test: {
    environment: 'jsdom',   // 👈 Enables document/window for React Testing Library
    globals: true,          // 👈 Allows using describe/it/expect without imports
    setupFiles: './src/setupTests.js', // 👈 Optional: for jest-dom setup
    css: true,              // 👈 Handles CSS imports in tests
    coverage: {             // 👈 Enables coverage reports
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
