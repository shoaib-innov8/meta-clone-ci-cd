const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();


const seedUsers = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'password123',
    "age": 27
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    password: 'password456',
    "age": 31
  },
  {
    name: 'Charlie',
    email: 'charlie@example.com',
    password: 'password789',
    "age": 26
  },
  {
    name: 'Dana',
    email: 'dana@example.com',
    password: 'mypassword',
    "age": 20
  },
  {
    name: 'Eve',
    email: 'eve@example.com',
    password: 'supersecure',
    "age": 29
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected...');

    // Hash passwords
    console.log('Seeding database...');
    for (let user of seedUsers) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    // Clear existing users (optional)
    await User.deleteMany({});
    console.log('Existing users removed');

    // Insert seed users
    await User.insertMany(seedUsers);
    console.log('Users seeded successfully');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
