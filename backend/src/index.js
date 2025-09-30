import mongoose from 'mongoose';
import { createApp } from './app.js';
import { config } from './config.js';

// Determine MongoDB URI based on the environment
const mongoUri = process.env.MONGO_URI || config.mongoUri;

const app = createApp();

mongoose.connect(mongoUri).then(() => {
  app.listen(config.port, () => {
    console.log(`API listening on http://0.0.0.0:${config.port}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});
