const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authService = require("../services/authService")


router.post('/checkuser', authController.checkUser)
// POST: /api/register
router.post('/register', authController.register);

// POST: /api/login
router.post('/login', authController.login);

// POST: /api/logout
router.post('/logout', authController.logout);

// POST: /api/forgot-password
router.post('/forgotpassword', (authService.forgotPassword));
router.post('/resendotp', (authService.resendOTP));
router.post('/verifyotp', (authService.verifyOtp));
router.post('/resetpassword', (authService.resetPassword));


module.exports = router;
