const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(cors({
  origin: '*'
}));

// Middleware
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.NODE_ENV === 'test' 
  ? process.env.MONGO_TEST_URI 
  : process.env.MONGO_DEV_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log(`MongoDB connected to ${process.env.NODE_ENV} database`))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
