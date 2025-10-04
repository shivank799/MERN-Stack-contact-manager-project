import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../src/app.js';

let mongod;
let app;

jest.setTimeout(30000); // 30s timeout for async operations

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  app = createApp();
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

describe('Auth API', () => {
  test('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 't@example.com',
      password: 'secret123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.token).toBeTruthy();
  });

  test('should login the user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 't@example.com',
      password: 'secret123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.token).toBeTruthy();
  });
});
