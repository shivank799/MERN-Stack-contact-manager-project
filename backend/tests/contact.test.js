import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../src/app.js';
let mongod;
let app;
let token;

jest.setTimeout(30000); // increase timeout for async operations

beforeAll(async () => {
  // Start in-memory MongoDB
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();

  // Create app instance
  app = createApp();

  // Connect mongoose
  await mongoose.connect(process.env.MONGO_URI);

  // Register a test user and get token
  const res = await request(app).post('/api/auth/register').send({
    name: 'Tester',
    email: 'c@example.com',
    password: 'secret123'
  });

  expect(res.statusCode).toBe(201);
  expect(res.body.token).toBeDefined();

  token = res.body.token;
});

afterAll(async () => {
  // Close mongoose connection and stop in-memory MongoDB
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

describe('Contacts API', () => {
  let contactId;

  test('should create a contact', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Alice', email: 'a@a.com', phone: '123' });

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();

    contactId = res.body._id;
  });

  test('should list contacts', async () => {
    const res = await request(app)
      .get('/api/contacts')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('should update a contact', async () => {
    const res = await request(app)
      .put(`/api/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ phone: '456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.phone).toBe('456');
  });

  test('should delete a contact', async () => {
    const res = await request(app)
      .delete(`/api/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok || res.body.deletedCount || res.body._id).toBeDefined();
  });
});
