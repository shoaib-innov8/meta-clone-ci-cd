const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middleware/auth');

const multer = require('multer');
const upload = multer();
const uploadToS3 = require('../utils/s3Upload');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, age, company, department, specification, about } = req.body;
    const user = new User({ name, email, password, age, company, department, specification, about });
    await user.save();
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put('/:id', auth, upload.single('profile_pic'), async (req, res) => {
  try {
    const { name, email, age, company, department, specification, about } = req.body;
    let updateData = { name, email, age, company, department, specification, about };
    if (req.file) {
      const s3Result = await uploadToS3(req.file);
      updateData.profile_pic = s3Result.Location;
    }
   const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
