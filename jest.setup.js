require('dotenv').config();
const { connectTestDB, closeDatabase } = require('./test/setup');

// Set test environment
process.env.NODE_ENV = 'test';

// Connect to test database before all tests
beforeAll(async () => {
  await connectTestDB();
});

// Close database connection after all tests
afterAll(async () => {
  await closeDatabase();
});
