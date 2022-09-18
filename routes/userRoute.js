const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Register a user
router.post('/register', async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Simple validation
    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    let user = await userModel.findOne({ email });

    // Check if user already exists
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    // Create a new user
    const newUser = new userModel({
      userName,
      email,
      password,
    });

    // // save user to database
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User Registered successfully',
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const user = await userModel.findOne({ email }).select('+password');

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }

    // Check if password is correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Incorrect password',
      });
    }

    // Generate token
    const token = await user.generateAuthToken();

    res.status(200).json({
      message: 'User logged in successfully',
      userData: {
        user,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
