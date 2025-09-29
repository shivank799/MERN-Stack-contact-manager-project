import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contacts.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config.js';

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: config.clientUrl, credentials: true }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(rateLimit({ windowMs: 60_000, max: 100 }));

  app.get('/healthz', (_, res) => res.json({ ok: true }));

  app.use('/api/auth', authRoutes);
  app.use('/api/contacts', contactRoutes);

  app.use(errorHandler);
  return app;
}
