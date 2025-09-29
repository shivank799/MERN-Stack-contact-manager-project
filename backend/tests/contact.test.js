import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../src/app.js';

let mongod, app, token;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  app = createApp();
  await mongoose.connect(process.env.MONGO_URI);

  const reg = await request(app).post('/api/auth/register').send({
    name: 'Tester', email: 'c@example.com', password: 'secret123'
  });
  token = reg.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongod.stop();
});

test('create, list, update, delete contact', async () => {
  const created = await request(app)
    .post('/api/contacts')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Alice', email: 'a@a.com', phone: '123' });
  expect(created.statusCode).toBe(201);
  const id = created.body._id;

  const list = await request(app)
    .get('/api/contacts')
    .set('Authorization', `Bearer ${token}`);
  expect(list.statusCode).toBe(200);
  expect(Array.isArray(list.body)).toBe(true);
  expect(list.body.length).toBe(1);

  const updated = await request(app)
    .put(`/api/contacts/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ phone: '456' });
  expect(updated.statusCode).toBe(200);
  expect(updated.body.phone).toBe('456');

  const deleted = await request(app)
    .delete(`/api/contacts/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(deleted.statusCode).toBe(200);
  expect(deleted.body.ok).toBe(true);
});
