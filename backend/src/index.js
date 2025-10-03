import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { createApp } from './app.js';
import { config } from './config.js';
import { Contact } from './models/Contact.js';  // Import the Contact model

// Determine MongoDB URI based on the environment
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://Shivank79_db_user:k.bQ39B88@cluster0.s5r9fje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = createApp();

// MongoDB connection
mongoose.connect(mongoUri)
  .then(async () => {
    // Drop the unique index on phoneNumber if it exists
    try {
      await Contact.collection.dropIndex('phoneNumber_1');  // Drop the unique index on phoneNumber
      console.log('Dropped unique index on phoneNumber');
    } catch (err) {
      console.log('No unique index found on phoneNumber');
    }

    // If successful connection to MongoDB, start the Express server
    app.listen(config.port, () => {
      console.log(`API listening on http://0.0.0.0:${config.port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Ensure the backend has a route defined for '/'
app.get('/', (req, res) => {
  res.send('Welcome to the backend API');  // You can customize this response as needed
});

// Add any other API routes or middleware as needed here
