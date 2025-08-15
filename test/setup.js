const mongoose = require('mongoose');
require('dotenv').config();

// Setup code for Jest tests can be added here

// Function to connect to the test database
const connectTestDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to test database');
  } catch (error) {
    console.error('Error connecting to test database:', error);
    process.exit(1);
  }
};

// Function to close database connection
const closeDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log('Test database connection closed');
  } catch (error) {
    console.error('Error closing test database connection:', error);
    process.exit(1);
  }
};

// Function to clear the database between tests
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

module.exports = {
  connectTestDB,
  closeDatabase,
  clearDatabase,
};
