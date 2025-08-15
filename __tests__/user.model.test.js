const mongoose = require('mongoose');
const { clearDatabase } = require('../test/setup');
const User = require('../models/User');

describe('User Model Test', () => {
    beforeEach(async () => {
        await clearDatabase();
    });

    it('should create & save user successfully', async () => {
        const validUser = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            age: 25,
            company: 'Tech Corp',
            department: 'Engineering',
            specification: 'Software Developer',
            about: 'Passionate about coding'
        });
        const savedUser = await validUser.save();
        
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(validUser.name);
        expect(savedUser.email).toBe(validUser.email);
        expect(savedUser.password).not.toBe('password123'); // Password should be hashed
        expect(savedUser.age).toBe(validUser.age);
    });

    it('should fail to save user without required fields', async () => {
        const userWithoutRequiredField = new User({ name: 'John Doe' });
        let err;
        
        try {
            await userWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    });

    it('should fail to save user with invalid email format', async () => {
        const userWithInvalidEmail = new User({
            name: 'John Doe',
            email: 'invalid-email',
            password: 'password123',
            age: 25
        });
        let err;
        
        try {
            await userWithInvalidEmail.save();
        } catch (error) {
            err = error;
        }
        
        expect(err).toBeDefined();
    });
});
