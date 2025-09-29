import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/contacts_db',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
