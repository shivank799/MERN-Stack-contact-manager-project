/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',       // Use Node environment
  roots: ['<rootDir>/src'],      // Your source folder
  transform: {},                 // No transform needed for pure Node (JS)
  moduleFileExtensions: ['js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'], // allows absolute imports from src
  testMatch: ['**/tests/**/*.test.js'],       // Matches your test files
  verbose: true,
};
