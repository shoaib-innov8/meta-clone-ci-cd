const request = require('supertest');
const mongoose = require('mongoose');
const { clearDatabase } = require('../test/setup');
const app = require('../index');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

describe('User Routes', () => {
    let token;
    let testUser;

    beforeEach(async () => {
        await clearDatabase();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        testUser = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            age: 25
        });
        token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET);
    });

    describe('POST /api/users/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/users/register')
                .send({
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password123',
                    age: 25
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.user).toHaveProperty('name', 'John Doe');
            expect(res.body.user).not.toHaveProperty('password');
        });

        it('should not register user with existing email', async () => {
            const res = await request(app)
                .post('/api/users/register')
                .send({
                    name: 'Another User',
                    email: 'test@example.com',
                    password: 'password123',
                    age: 25
                });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /api/users/login', () => {
        it('should login with valid credentials', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('email', 'test@example.com');
        });

        it('should not login with invalid credentials', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toBe(401);
        });
    });

    describe('GET /api/users', () => {
        it('should get all users', async () => {
            const res = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBe(1);
        });
    });

    describe('GET /api/users/:id', () => {
        it('should get user by id', async () => {
            const res = await request(app)
                .get(`/api/users/${testUser._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('name', 'Test User');
        });

        it('should return 404 for non-existent user', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .get(`/api/users/${fakeId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(404);
        });
    });

    describe('PUT /api/users/:id', () => {
        it('should update user', async () => {
            const res = await request(app)
                .put(`/api/users/${testUser._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Updated Name',
                    company: 'New Company'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('name', 'Updated Name');
            expect(res.body).toHaveProperty('company', 'New Company');
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('should delete user', async () => {
            const res = await request(app)
                .delete(`/api/users/${testUser._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            
            const deletedUser = await User.findById(testUser._id);
            expect(deletedUser).toBeNull();
        });
    });
});
