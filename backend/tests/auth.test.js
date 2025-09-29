import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../src/app.js';
import { config as baseConfig } from '../src/config.js';

let mongod, app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  app = createApp();
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongod.stop();
});

test('register and login', async () => {
  const reg = await request(app).post('/api/auth/register').send({
    name: 'Test User', email: 't@example.com', password: 'secret123'
  });
  expect(reg.statusCode).toBe(201);
  expect(reg.body.token).toBeDefined();

  const login = await request(app).post('/api/auth/login').send({
    email: 't@example.com', password: 'secret123'
  });
  expect(login.statusCode).toBe(200);
  expect(login.body.token).toBeDefined();
});
