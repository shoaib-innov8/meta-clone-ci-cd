require('dotenv').config(); // loads default env (usually development)

const mongoose = require('mongoose');

const configs = {
  dev: {
    uri: process.env.MONGO_DEV_URI,
  },
  test: {
    uri: process.env.MONGO_TEST_URI,
  },
};

// Create connections for each environment
const connection = {
  dev: mongoose.createConnection(configs.dev.uri, { useNewUrlParser: true, useUnifiedTopology: true }),
  test: mongoose.createConnection(configs.test.uri, { useNewUrlParser: true, useUnifiedTopology: true }),
};

module.exports = connection;
