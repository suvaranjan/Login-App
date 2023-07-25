My Backend File structure :

- backend
  |- config
  |- db.js // Database configuration (e.g., MongoDB connection)
  |- nodemailer.js // Nodemailer configuration for sending emails
  |- jwt.js // JWT configuration and token handling
  |- controllers
  |- authController.js // Controller for user authentication (login, registration, logout, password reset)
  |- profileController.js // Controller for updating user profiles
  |- middleware
  |- authMiddleware.js // Middleware for JWT authentication
  |- models
  |- User.js // User Mongoose model
  |- routes
  |- authRoutes.js // Routes for user authentication
  |- profileRoutes.js // Routes for user profile update
  |- index.js // Entry point of the backend server

//Authroute for mail end point

// authRoutes.js

<!-- const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ResetPassword = require('../models/ResetPassword');
const { generateOTP } = require('../utils/generateOtp');
const { sendOTPByEmail } = require('../utils/nodemailer');

// Route to send OTP to the user's email for password reset
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP and save it with the user's email in the ResetPassword collection
    const otp = generateOTP();
    await ResetPassword.findOneAndUpdate({ email }, { otp }, { upsert: true });

    // Send OTP to the user's email
    const isSent = await sendOTPByEmail(email, otp);

    if (isSent) {
      return res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to send OTP' });
    }
  } catch (error) {
    console.error('Error sending OTP: ', error);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Route to handle OTP verification and password reset
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Check if the OTP is valid
    const otpData = await ResetPassword.findOne({ email, otp });
    if (!otpData) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Update the user's password with the new one
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    // Remove the OTP data from the ResetPassword collection
    await otpData.remove();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password: ', error);
    return res.status(500).json({ message: 'Failed to reset password' });
  }
});

module.exports = router; -->
